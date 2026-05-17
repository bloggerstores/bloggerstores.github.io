/* ================================================================================================
    QRO Hobbies — Parser de Pedidos
    Convierte el mensaje de WhatsApp de la tienda en URL de orden para el cliente.
    Última actualización: 16/05/2026
================================================================================================ */

// ── URL de la página genérica de orden (ajusta si cambia) ──
var ORDEN_URL = 'https://qrohobbiesinvoice.blogspot.com/p/orden.html';

window.onload = function () {

  $('#parser-form').on('submit', function (e) {
    e.preventDefault();
    var texto = $('#pedido-input').val().trim();
    if (!texto) return;

    var datos = parsearPedido(texto);
    if (!datos) {
      mostrarError('No se pudo leer el mensaje. ¿Es el formato correcto de la tienda?');
      return;
    }

    mostrarPreview(datos);
  });

  $('#iva-check').on('change', function () {
    $('#iva-row').toggle($(this).is(':checked'));
  });

  $(document).on('click', '#btn-generar', function () {
    var datos = leerFormPreview();
    var url = construirURL(datos);

    $('#resultado-url').val(url);
    $('#resultado-section').show();

    // Copiar al portapapeles automáticamente
    copiarTexto(url);
    mostrarNotice('✓ URL copiada al portapapeles. Pégala en WhatsApp al cliente.');
  });

  $(document).on('click', '#btn-abrir', function () {
    var url = $('#resultado-url').val();
    if (url) window.open(url, '_blank');
  });

  $(document).on('click', '#btn-copiar', function () {
    var url = $('#resultado-url').val();
    copiarTexto(url);
    mostrarNotice('✓ URL copiada al portapapeles.');
  });

  $(document).on('click', '#btn-reset', function () {
    $('#pedido-input').val('');
    $('#preview-section').hide();
    $('#resultado-section').hide();
    $('#error-msg').hide();
    $('#pedido-input').focus();
  });

};

// ── Parser principal del mensaje de WhatsApp ──
function parsearPedido(texto) {
  try {
    var datos = {
      cliente: '',
      tel: '',
      email: '',
      dir: '',
      entrega: '',
      items: [],
      nota: '',
      desc: '',
      iva: ''
    };

    // Nombre y teléfono: "Información del pedido : *Nombre* ( tel )"
    var mCliente = texto.match(/Información del pedido\s*:\s*\*([^*]+)\*\s*\(([^)]+)\)/);
    if (mCliente) {
      datos.cliente = mCliente[1].trim();
      datos.tel = mCliente[2].trim();
    }

    // Email
    var mEmail = texto.match(/Correo electrónico\*\s*:\s*(.+?)\s*\*Notas/);
    if (mEmail) datos.email = mEmail[1].trim();

    // Dirección / método de entrega
    var mEntrega = texto.match(/Métodos de entrega\*\s*:\s*(.+?)\s*\*Métodos de pago/);
    if (mEntrega) datos.entrega = mEntrega[1].trim();

    // Notas
    var mNota = texto.match(/Notas del pedido\*\s*:\s*(.+?)\s*\*Métodos de entrega/);
    if (mNota && mNota[1].trim() !== '-') datos.nota = mNota[1].trim().replace(/\*/g, '');

    // Artículos: cada bloque "*Producto* Pago : *Variante* Cantidad y precio : *N* x $P = *$T*"
    // Puede haber múltiples artículos separados por numeración "1. *Producto*..." o directamente
    // Patrón: *nombre* ... Cantidad y precio : *qty* x $precio
    var reItem = /\*([^*]+)\*[^]*?Cantidad y precio\s*:\s*\*(\d+)\*\s*x\s*\$([0-9,\.]+)/g;
    var match;
    while ((match = reItem.exec(texto)) !== null) {
      var nombre = match[1].trim();
      var qty    = match[2].trim();
      var precio = match[3].replace(/[,\.]/g, '').trim();
      // Filtrar si el "nombre" capturado es en realidad una variante (Total, Anticipo, etc.)
      if (nombre && !nombre.match(/^(Total|Anticipo|\d+)$/i)) {
        datos.items.push({ nombre: nombre, precio: precio, qty: qty });
      }
    }

    // Si no capturó artículos con el patrón anterior, intentar patrón simple (un solo artículo)
    if (datos.items.length === 0) {
      var mItem = texto.match(/quiero ordenar\s*:\s*\*([^*]+)\*/);
      var mQty  = texto.match(/Cantidad y precio\s*:\s*\*(\d+)\*/);
      var mPrecio = texto.match(/x\s*\$([0-9,\.]+)\s*=/);
      if (mItem && mQty && mPrecio) {
        datos.items.push({
          nombre: mItem[1].trim(),
          qty: mQty[1].trim(),
          precio: mPrecio[1].replace(/[,\.]/g, '').trim()
        });
      }
    }

    if (!datos.cliente || datos.items.length === 0) return null;
    return datos;

  } catch(e) {
    return null;
  }
}

// ── Mostrar preview editable ──
function mostrarPreview(datos) {
  $('#error-msg').hide();

  $('#prev-cliente').val(datos.cliente);
  $('#prev-tel').val(datos.tel);
  $('#prev-email').val(datos.email);
  $('#prev-entrega').val(datos.entrega);
  $('#prev-nota').val(datos.nota);
  $('#prev-desc').val(datos.desc);

  // Artículos
  var itemsHtml = '';
  datos.items.forEach(function(it, i) {
    itemsHtml += '<div class="item-row" style="display:flex;gap:8px;margin-bottom:6px;">'
      + '<input type="text" class="item-nombre" value="' + escHtml(it.nombre) + '" placeholder="Artículo" style="flex:3;">'
      + '<input type="number" class="item-precio" value="' + it.precio + '" placeholder="Precio" style="flex:1;">'
      + '<input type="number" class="item-qty" value="' + it.qty + '" placeholder="Qty" style="flex:1;max-width:60px;">'
      + '<button type="button" class="btn-del-item" style="flex-shrink:0;" title="Eliminar">✕</button>'
      + '</div>';
  });
  $('#prev-items').html(itemsHtml);

  // Evento eliminar fila
  $(document).off('click', '.btn-del-item').on('click', '.btn-del-item', function() {
    $(this).closest('.item-row').remove();
  });

  // IVA apagado por defecto
  $('#iva-check').prop('checked', false);
  $('#iva-row').hide();

  $('#preview-section').show();
  $('#resultado-section').hide();
  $('html, body').animate({ scrollTop: $('#preview-section').offset().top - 20 }, 300);
}

// ── Leer los campos del preview (con ediciones manuales) ──
function leerFormPreview() {
  var datos = {
    cliente: $('#prev-cliente').val().trim(),
    tel:     $('#prev-tel').val().trim(),
    email:   $('#prev-email').val().trim(),
    entrega: $('#prev-entrega').val().trim(),
    nota:    $('#prev-nota').val().trim(),
    desc:    $('#prev-desc').val().trim(),
    iva:     $('#iva-check').is(':checked') ? '16' : '',
    items:   []
  };
  $('.item-row').each(function() {
    var nombre = $('.item-nombre', this).val().trim();
    var precio = $('.item-precio', this).val().trim();
    var qty    = $('.item-qty', this).val().trim();
    if (nombre) datos.items.push({ nombre: nombre, precio: precio, qty: qty });
  });
  return datos;
}

// ── Construir URL con params GET ──
function construirURL(datos) {
  var itemsStr = datos.items.map(function(it) {
    return encodeURIComponent(it.nombre) + '|' + it.precio + '|' + it.qty;
  }).join(',');

  var dir = datos.entrega; // dirección/entrega como campo dir

  var url = ORDEN_URL + '?'
    + 'cliente=' + encodeURIComponent(datos.cliente)
    + '&tel='    + encodeURIComponent(datos.tel)
    + '&email='  + encodeURIComponent(datos.email)
    + '&dir='    + encodeURIComponent(dir)
    + '&entrega='+ encodeURIComponent(datos.entrega)
    + '&items='  + itemsStr
    + (datos.desc  ? '&desc='  + encodeURIComponent(datos.desc)  : '')
    + (datos.iva   ? '&iva='   + datos.iva : '')
    + (datos.nota  ? '&nota='  + encodeURIComponent(datos.nota)  : '');

  return url;
}

function copiarTexto(texto) {
  var $temp = $('<input>').val(texto).appendTo('body');
  $temp.select();
  document.execCommand('copy');
  $temp.remove();
}

function mostrarError(msg) {
  $('#error-msg').text(msg).show();
  $('#preview-section').hide();
}

function mostrarNotice(msg) {
  $('#notice-parser').text(msg).show();
  setTimeout(function() { $('#notice-parser').fadeOut(); }, 3000);
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
