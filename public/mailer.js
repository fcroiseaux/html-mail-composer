var editor, html = '';

function createHTMLMailEditor() {
  if (editor)
    return;

  // Create a new editor inside the <div id="editor">, setting its value to html
  var config = {};
  editor = CKEDITOR.appendTo('editor', config, html);
}

function validateHTMLMail() {
  if (!editor)
    return;

  var htmlMail = html = editor.getData();
  console.log(htmlMail);

  $.ajax({
    type: "POST",
    url: "/premailer/",
    data: {
      html: htmlMail
    },
    success: function(data, textStatus, jqXHR) {
      document.getElementById('editorcontents').innerHTML = data;
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
