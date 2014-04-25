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
  premailer.warnings.each do |w|
    puts "#{w[:message]} (#{w[:level]}) may not render properly in #{w[:clients]}"
  end

  premailer.to_inline_css
end
