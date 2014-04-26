var editor, html = '';

function createEditor() {
  if (editor)
    return;

  // Create a new editor inside the <div id="editor">, setting its value to html
  var config = {};
  editor = CKEDITOR.appendTo('editor', config, html);
}

function removeEditor() {
  if (!editor)
    return;

  // Retrieve the editor contents. In an Ajax application, this data would be
  // sent to the server or used in any other way.
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
