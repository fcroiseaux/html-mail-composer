var editor, html = '';

function createHTMLMailEditor() {
  if (editor)
    return;

  // Create a new editor inside the <div id="editor">, setting its value to html
  var config = {};
  editor = CKEDITOR.appendTo('editor', config, html);
}


var getMailCompatibleHTML = function(htmlMail, callback) {

}

function validateHTMLMail() {
  if (!editor)
    return;

  var htmlMail = html = editor.getData();

  $.ajax({
    type: "POST",
    url: "/premailer/",
    data: {
      html: htmlMail
    },
    success: function(data, textStatus, jqXHR) {
      document.getElementById('htmlResult').innerHTML = data.html;
      document.getElementById('plainTextResult').innerHTML = data.plain_text;
      var warningHTML = "";
      for (var i = 0; i < data.warnings.length; i++) {
        warningHTML += "<p>" + data.warnings[i] + "</p>";
      }
      document.getElementById('warningsResult').innerHTML = warningHTML;
      document.getElementById('contents').style.display = '';
      // Destroy the editor.
      editor.destroy();
      editor = null;
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert("ERROR " + textStatus);
    }
  });
}
