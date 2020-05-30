class Api::MessagesController < ApplicationController
  def index
    
    group = Group.find(params[:group_id])
    # 上記を元にどのgroup_idか判断する
    last_message_id = params[:id].to_i
    # ajaxで送られてくる最後のidを変数に代入
    @messages = group.messages.includes(:user).where("id > ?", last_message_id)
    # where id > ?で送られてくるidが既存のより大きいやつをとってくる
  end
end