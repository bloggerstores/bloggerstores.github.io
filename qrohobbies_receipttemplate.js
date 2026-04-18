/* ===========================================================================================================

¡Advertencia!

============================================================================================================

Modificar o eliminar este archivo puede provocar:

1. Daños o errores en la plantilla

2. La pérdida de la función de actualización/reparación automática de la plantilla

3. La pérdida de la asistencia del creador de la plantilla

Gracias

Última actualización: 15/11/2024 a las 20:16

================================================================================================ */

license();
function license() {
  console.log('License check disabled');
}
window.onload = function () {
  const _0x10d45e = new Date();
  const _0x2aa5c6 = _0x10d45e.getTime();
  const _0x164738 = document.title;
  document.title = _0x164738 + " - " + $(".client-name").text() + " - " + _0x2aa5c6;
  $(".data-id").html(_0x2aa5c6);
  $(".data-waktu").html(waktu(_0x10d45e.getTime()));
  $(".client-name").on("input", function () {
    document.title = _0x164738 + " - " + $(this).text() + " - " + _0x2aa5c6;
  });
  $('input').on('focus', function () {
    $(this).select();
  });
  function _0x1783ea(_0x3f6028) {
    if (typeof _0x3f6028 != "string") {
      return false;
    }
    return !isNaN(_0x3f6028) && !isNaN(parseFloat(_0x3f6028));
  }
  $("input").on("input", function () {
    var _0x4f5b03 = $(this).val().replaceAll('.', '');
    if (!_0x1783ea(_0x4f5b03)) {
      _0x4f5b03 = '';
    } else {
      _0x4f5b03 = Number($(this).val().replaceAll('.', ''));
    }
    $(this).val(separator(_0x4f5b03));
  });
  $("input").on("change", function () {
    var _0x3d22af = 0x0;
    var _0x4c6782 = Number($('[name=discount]').val().replaceAll('.', ''));
    var _0x416456 = Number($('[name=downpayment]').val().replaceAll('.', ''));
    $("table tbody tr").each(function () {
      var _0x316c16 = Number($("[name=price]", this).val().replaceAll(',', ''));
      var _0x56b8ea = Number($('[name=qty]', this).val().replaceAll('.', ''));
      var _0x4a04db = Number(_0x316c16 * _0x56b8ea);
      if (_0x4a04db > 0x0) {
        $('.amount', this).text('$' + separator(_0x4a04db));
      }
      _0x3d22af = _0x3d22af + _0x4a04db;
    });
    $('.subtotal').text('$' + separator(_0x3d22af));
    $('.total').text('$' + separator(_0x3d22af - _0x4c6782));
    if (_0x416456) {
      $('.repayment').text('$' + separator(_0x3d22af - _0x4c6782 - _0x416456));
    } else {
      $(".repayment").text(0x0);
    }
  });
  let _0x396f78 = document.getElementById('print');
  _0x396f78.addEventListener('click', _0x46329a => {
    _0x46329a.preventDefault();
    window.print();
  }, false);
  custom_js();
};
function waktu(_0x2cd93c = '') {
  var _0x22eed5 = new Date();
  if (_0x2cd93c) {
    _0x22eed5 = new Date(_0x2cd93c);
  }
  var _0x421bc8 = _0x22eed5.getFullYear();
  var _0x31e7d8 = _0x22eed5.getMonth();
  var _0xfe079c = _0x22eed5.getDate();
  var _0x526ac4 = _0x22eed5.getDay();
  switch (_0x526ac4) {
    case 0x0:
      _0x526ac4 = 'Domingo';
      break;
    case 0x1:
      _0x526ac4 = "Lunes";
      break;
    case 0x2:
      _0x526ac4 = "Martes";
      break;
    case 0x3:
      _0x526ac4 = "Miércoles";
      break;
    case 0x4:
      _0x526ac4 = "Jueves";
      break;
    case 0x5:
      _0x526ac4 = "Viernes";
      break;
    case 0x6:
      _0x526ac4 = "Sábado";
      break;
  }
  switch (_0x31e7d8) {
    case 0x0:
      _0x31e7d8 = "enero";
      break;
    case 0x1:
      _0x31e7d8 = 'febrero';
      break;
    case 0x2:
      _0x31e7d8 = "marzo";
      break;
    case 0x3:
      _0x31e7d8 = 'abril';
      break;
    case 0x4:
      _0x31e7d8 = 'mayo';
      break;
    case 0x5:
      _0x31e7d8 = 'junio';
      break;
    case 0x6:
      _0x31e7d8 = "julio";
      break;
    case 0x7:
      _0x31e7d8 = "agosto";
      break;
    case 0x8:
      _0x31e7d8 = "septiembre";
      break;
    case 0x9:
      _0x31e7d8 = "octubre";
      break;
    case 0xa:
      _0x31e7d8 = 'noviembre';
      break;
    case 0xb:
      _0x31e7d8 = "diciembre";
      break;
  }
  return "<b>" + _0x526ac4 + "</b>, " + _0xfe079c + " " + _0x31e7d8 + " " + _0x421bc8;
}
function separator(_0x19ef43, _0x39ddb7 = '') {
  var _0x341eeb = '';
  var _0x70c6fa = _0x19ef43.toString().split('').reverse().join('');
  for (var _0x14ab1a = 0x0; _0x14ab1a < _0x70c6fa.length; _0x14ab1a++) {
    if (_0x14ab1a % 0x3 == 0x0) {
      _0x341eeb += _0x70c6fa.substr(_0x14ab1a, 0x3) + ',';
    }
  }
  return _0x39ddb7 ? _0x39ddb7 + " " + _0x341eeb.split('', _0x341eeb.length - 0x1).reverse().join('') : _0x341eeb.split('', _0x341eeb.length - 0x1).reverse().join('');
}
// Formatear campos [name=price], [name=discount], [name=downpayment] al salir del input
$(document).on('blur', '[name=price], [name=discount], [name=downpayment]', function () {
  let raw = $(this).val().replace(/[^0-9]/g, '');
  if (!raw) {
    return;
  }
  let formatted = '$' + separator(Number(raw));
  $(this).val(formatted);
});

// Limpiar los campos al entrar para editar
$(document).on('focus', '[name=price], [name=discount], [name=downpayment]', function () {
  let cleaned = $(this).val().replace(/[^0-9]/g, '');
  $(this).val(cleaned);
});

// Calcular importes y totales al cambiar precio, cantidad, descuento o anticipo
$(document).on('input change', '[name=price], [name=qty], [name=discount], [name=downpayment]', function () {
  let subtotal = 0;
  $('table tbody tr').each(function () {
    let priceInput = $('[name=price]', this).val() || '';
    let qtyInput = $('[name=qty]', this).val() || '';
    let price = Number(priceInput.replace(/[^0-9.]/g, ''));
    let qty = Number(qtyInput.replace(/[^0-9]/g, ''));
    let amount = price * qty;
    if (!isNaN(amount) && amount > 0) {
      $('.amount', this).text('$' + separator(amount));
      subtotal += amount;
    } else {
      $('.amount', this).text('');
    }
  });
  let discount = Number($('[name=discount]').val().replace(/[^0-9.]/g, '') || '0');
  let downpayment = Number($('[name=downpayment]').val().replace(/[^0-9.]/g, '') || '0');
  let total = subtotal - discount;
  let remaining = total - downpayment;
  $('.subtotal').text('$' + separator(subtotal));
  $('.total').text('$' + separator(total));
  $('.repayment').text(remaining > 0 ? '$' + separator(remaining) : '0');
});