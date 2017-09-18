// Get the day of the week
var d = new Date();
var n = d.getDay();

var time = d.getHours() + ":" + d.getMinutes()



//London Opening Times

var ldnOpening = '';
var ldnClosed = '';
var ldnClosing = '';
var ldnIsopen = '';
var ldnIsclosing = '';

if (n == 1 || n == 2 || n == 3 || n == 5 || n == 6) {
  ldnOpening = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 10, 00);
  ldnClosing = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 17, 30);
  ldnClosed = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 18, 30);
} else if (n == 4) {
  ldnOpening = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 10, 00);
  ldnClosing = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 18, 30);
  ldnClosed = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 19, 30);
} else if (n == 0) {
  ldnOpening = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 13, 00);
  ldnClosing = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 15, 30);
  ldnClosed = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 16, 30);
}


ldnIsopen = (d.getTime() > ldnOpening.getTime() && d.getTime() < ldnClosing.getTime());
ldnIsclosing = (d.getTime() > ldnClosing.getTime() && d.getTime() < ldnClosed.getTime());

//Burgess Hill Opening Times

var bhOpening = '';
var bhClosed = '';
var bhClosing = '';
var bhIsopen = '';
var bhIsclosing = '';

if (n == 1 || n == 2 || n == 3 || n == 5 || n == 6) {
  bhOpening = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 9, 00);
  bhClosing = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 16, 30);
  bhClosed = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 17, 30);
} else if (n == 4) {
  bhOpening = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 9, 00);
  bhClosing = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 18, 30);
  bhClosed = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 19, 30);
} else if (n == 0) {
  bhOpening = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 10, 00);
  bhClosing = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 15, 00);
  bhClosed = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 16, 00);
}


bhIsopen = (d.getTime() > bhOpening.getTime() && d.getTime() < bhClosing.getTime());
bhIsclosing = (d.getTime() > bhClosing.getTime() && d.getTime() < bhClosed.getTime());




//Phone Opening Times

var phoneOpening = '';
var phoneClosed = '';
var phoneClosing = '';
var phoneIsopen = '';
var phoneIsclosing = '';


if (n != 0) {
  phoneOpening = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 9, 00);
  phoneClosing = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 16, 30);
  phoneClosed = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 17, 30);
}

phoneIsopen = (d.getTime() > phoneOpening.getTime() && d.getTime() < phoneClosing.getTime());
phoneIsclosing = (d.getTime() > phoneClosing.getTime() && d.getTime() < phoneClosed.getTime());

if (phoneIsopen) {
  $('#phone-status').html('Open Now');
  $('#phone-status').css('color', '#41a940');

} else if (phoneIsclosing) {
  $('#phone-status').html('Closing Soon');
  $('#phone-status').css('color', '#ff5f00');
} else {
  $('#phone-status').html('Closed');
  $('#phone-status').css('color', '#CC0000');
}


// Bold the day of the week in opening times
if (n == '1') {
  $('#monday-bh').css('font-weight', 'bold');
  $('#monday-ldn').css('font-weight', 'bold');

  if (bhIsopen) {
    $('#monday-bh').css('color', '#41a940');
  } else if (bhIsclosing) {
    $('#monday-bh').css('color', '#ff5f00');
  } else {
    $('#monday-bh').css('color', '#00000');
  }

  if (ldnIsopen) {
    $('#monday-ldn').css('color', '#41a940');
  } else if (ldnIsclosing) {
    $('#monday-ldn').css('color', '#ff5f00');
  } else {
    $('#monday-ldn').css('color', '#00000');
  }
} else if (n == '2') {
  $('#tuesday-bh').css('font-weight', 'bold');
  $('#tuesday-ldn').css('font-weight', 'bold');

  if (bhIsopen) {
    $('#tuesday-bh').css('color', '#41a940');
  } else if (bhIsclosing) {
    $('#tuesday-bh').css('color', '#ff5f00');
  } else {
    $('#tuesday-bh').css('color', '#00000');
  }

  if (ldnIsopen) {
    $('#tuesday-ldn').css('color', '#41a940');
  } else if (ldnIsclosing) {
    $('#tuesday-ldn').css('color', '#ff5f00');
  } else {
    $('#tuesday-ldn').css('color', '#00000');
  }
} else if (n == '3') {
  $('#wednesday-bh').css('font-weight', 'bold');
  $('#wednesday-ldn').css('font-weight', 'bold');

  if (bhIsopen) {
    $('#wednesday-bh').css('color', '#41a940');
  } else if (bhIsclosing) {
    $('#wednesday-bh').css('color', '#ff5f00');
  } else {
    $('#wednesday-bh').css('color', '#00000');
  }

  if (ldnIsopen) {
    $('#wednesday-ldn').css('color', '#41a940');
  } else if (ldnIsclosing) {
    $('#wednesday-ldn').css('color', '#ff5f00');
  } else {
    $('#wednesday-ldn').css('color', '#00000');
  }
} else if (n == '4') {
  $('#thursday-bh').css('font-weight', 'bold');
  $('#thursday-ldn').css('font-weight', 'bold');

  if (bhIsopen) {
    $('#thursday-bh').css('color', '#41a940');
  } else if (bhIsclosing) {
    $('#thursday-bh').css('color', '#ff5f00');
  } else {
    $('#thursday-bh').css('color', '#00000');
  }

  if (ldnIsopen) {
    $('#thursday-ldn').css('color', '#41a940');
  } else if (ldnIsclosing) {
    $('#thursday-ldn').css('color', '#ff5f00');
  } else {
    $('#thursday-ldn').css('color', '#00000');
  }
} else if (n == '5') {
  $('#friday-bh').css('font-weight', 'bold');
  $('#friday-ldn').css('font-weight', 'bold');

  if (bhIsopen) {
    $('#friday-bh').css('color', '#41a940');
  } else if (bhIsclosing) {
    $('#friday-bh').css('color', '#ff5f00');
  } else {
    $('#friday-bh').css('color', '#00000');
  }

  if (ldnIsopen) {
    $('#friday-ldn').css('color', '#41a940');
  } else if (ldnIsclosing) {
    $('#friday-ldn').css('color', '#ff5f00');
  } else {
    $('#friday-ldn').css('color', '#00000');
  }
} else if (n == '6') {
  $('#saturday-bh').css('font-weight', 'bold');
  $('#saturday-ldn').css('font-weight', 'bold');

  if (bhIsopen) {
    $('#saturday-bh').css('color', '#41a940');
  } else if (bhIsclosing) {
    $('#saturday-bh').css('color', '#ff5f00');
  } else {
    $('#saturday-bh').css('color', '#00000');
  }

  if (ldnIsopen) {
    $('#saturday-ldn').css('color', '#41a940');
  } else if (ldnIsclosing) {
    $('#saturday-ldn').css('color', '#ff5f00');
  } else {
    $('#saturday-ldn').css('color', '#00000');
  }

} else if (n == '0') {
  $('#sunday-bh').css('font-weight', 'bold');
  $('#sunday-ldn').css('font-weight', 'bold');

  if (bhIsopen) {
    $('#sunday-bh').css('color', '#41a940');
  } else if (bhIsclosing) {
    $('#sunday-bh').css('color', '#ff5f00');
  } else {
    $('#sunday-bh').css('color', '#000000');
  }

  if (ldnIsopen) {
    $('#sunday-ldn').css('color', '#41a940');
  } else if (ldnIsclosing) {
    $('#sunday-ldn').css('color', '#ff5f00');
  } else {
    $('#sunday-ldn').css('color', '#000000');
  }
}


//Zopim Livechat - Show live chat button if status is online...

$zopim(function () {
  $zopim.livechat.setOnStatus(livechat_status);
});

function livechat_status(status) {
  if (status == 'offline') {
    $('#chat-header').css('display', 'none');
    $('#chat-text').css('display', 'none');
    $('#chat-link').css('display', 'none');
    $('#chat-times').css('display', 'none');
  } else {
    console.log('Zopim Online');
  }
}
