var editor, html = '';

function createHTMLMailEditor() {
  if (editor)
    return;

  // Create a new editor inside the <div id="editor">, setting its value to html
  var config = {};
  editor = CKEDITOR.appendTo('editor', config, html);
}


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

function validateHTMLMail() {
  if (!editor)
    return;

  var htmlMail = html = editor.getData();

  getMailCompatibleHTML(htmlMail,
    function(data) {
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
    function(error) {
      alert("ERROR " + error)
    }
  );
}
