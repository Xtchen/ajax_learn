class CatsController < ApplicationController
	respond_to :html, :xml, :json, :text
	def index
		
	end
	def show
		@cat = Cat.find params[:id]
		respond_to do |format|
			format.html {render "show"}
		end
	end
end
