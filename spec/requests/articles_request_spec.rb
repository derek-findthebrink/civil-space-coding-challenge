require 'rails_helper'

RSpec.describe "Articles", type: :request do

  describe "GET /index" do
    it "returns http success" do
      get "/articles"
      expect(response).to have_http_status(:success)
    end

    it 'renders the index template' do
      get "/articles"
      expect(response).to render_template(:index)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/article/1"
      expect(response).to have_http_status(:success)
    end

    it 'renders the show template' do
      get "/article/1"
      expect(response).to render_template(:show)
    end
  end
end
