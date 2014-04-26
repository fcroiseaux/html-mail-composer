# myapp.rb
require 'rubygems' # optional for Ruby 1.9 or above.
require 'premailer'
require 'sinatra'
require 'json'


before do
   content_type :json
   headers 'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST']
end

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
  $warnings = Array.new

  premailer.warnings.each do |w|
    $warnings << "#{w[:message]} (#{w[:level]}) may not render properly in #{w[:clients]}"
  end

  $response = {
    :html => premailer.to_inline_css,
    :plain_text => premailer.to_plain_text,
    :warnings => $warnings
  }

  $response.to_json

end
