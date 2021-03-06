class Api::V1::UsersController < ApplicationController
    before_action :set_user, only: [:show, :update, :destroy]

    def show 
        render json: @user, include: [:doctors]
    end 

    def create 
        @user = User.new(user_params)

        if @user.save 
            session[:user_id] = @user.id 
            render json: @user, include: [:doctors]
        else 
            resp = {
                error: @user.errors.full_messages.to_sentence
            }
            render json: resp, status: :unprocessable_entity 
        end 
    end  

    def update 
        if @user.update(user_params)
            render json: @user, include: [:doctors] 
        else 
            render @user.errors, status: :unprocessable_entity 
        end 
    end 

    def destroy 
        session.clear
        @user.destroy 
    end 
    
    private 

        def set_user 
            @user = User.find(params[:id])
        end 

        def user_params 
            params.require(:user).permit(:name, :email, :password)  
        end 

    
end
