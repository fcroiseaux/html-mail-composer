# myapp.rb
require 'rubygems' # optional for Ruby 1.9 or above.
require 'premailer'
require 'sinatra'


post '/premailer/' do
  $tempFile = "input" + Time.now.strftime('%Y%m%d%H%M%S%L') + ".html"

  File.open("public/" +$tempFile, "w") do |f|
    f.puts request.POST["html"]
  end

  premailer = Premailer.new("http://localhost:4567/" + $tempFile, :warn_level => Premailer::Warnings::SAFE)

  # Write the HTML output
  File.open("public/output.html", "w") do |fout|
    fout.puts premailer.to_inline_css
  end

  # Write the plain-text output
  File.open("public/output.txt", "w") do |fout|
    fout.puts premailer.to_plain_text
  end

  File.delete("public/" +$tempFile)

  # Output any CSS warnings
  $warnings = ""

  premailer.warnings.each do |w|
    $warnings = $warnings + "<p>#{w[:message]} (#{w[:level]}) may not render properly in #{w[:clients]}</p>"
  end

  "<h1>Reformatted HTML</h1><div id='validHtml' style='border: solid 1px;'>" +
  premailer.to_inline_css +
  "</div></br>" +
  "<h1>Plain text</h1><div id='plainText' style='border: solid 1px;'>" +
  premailer.to_plain_text +
  "</div></br>" +
  "<h1>Warnings</h1><div id='warnings'>"+
  $warnings +
  "</div>"
end
