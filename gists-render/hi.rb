require 'sinatra'
require 'octokit'

set :views, "."

helpers do
  def h(text)
    Rack::Utils.escape_html(text)
  end
end

get '/user/:username' do |username|
  user = Octokit.user username
  count = user.public_gists
  erb :index, locals: { :count => count }
end

get '/user/:username/gists' do |username|
  gists = Octokit.gists username, :per_page => 5
  erb :gists, locals: { :gists => gists, username: username }
end
