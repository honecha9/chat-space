class UsersController < ApplicationController
  
  def index
    # 今回使うのはindexなのでここに記入
    # 
    return nil if params[:keyword] == ""
    # keywordが""つまりからなのでnilを返すようにしている"
    @users = User.where(['name Like ?', "%#{params[:keyword]}%"] ).where.not(id: current_user.id).limit(10)
    # name likeで似たようなものparams:keywordのものをdbからとってくる、where not ログイン中のユーザーは除外する、１０文字までかける
    respond_to do |format|
      format.html
      format.json
      
    end
  end
  
  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else  
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end

