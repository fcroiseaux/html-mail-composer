function getMailCompatibleHTML(html, successCallback, errorCallback) {
  $.ajax({
    type: "POST",
    url: "/premailer/",
    data: {
      html: html
    },
    success: function(data, textStatus, jqXHR) {
      successCallback(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorCallback(errorThrown);
    }
  });
}
