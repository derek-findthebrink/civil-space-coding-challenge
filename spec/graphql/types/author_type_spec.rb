require 'rails_helper'

describe Types::AuthorType do
  subject { described_class }

  describe 'fields' do
    it { is_expected.to have_field(:id).of_type('ID!') }
    it { is_expected.to have_field(:first_name).of_type('String') }
    it { is_expected.to have_field(:last_name).of_type('String') }
  end
end
