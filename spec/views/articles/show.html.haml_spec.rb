require 'rails_helper'

RSpec.describe "articles/show.html.haml", type: :view do
  it 'renders the public.js pack' do
    render
    expect(rendered).to match /packs-test\/public-.+\.js/
  end

  it 'renders the react app root' do
    render
    expect(rendered).to match /<div id='react-app'><\/div>/
  end
end
