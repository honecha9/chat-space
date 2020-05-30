Time::DATE_FORMATS[:datetime] = "%Y年%m月%d日 %H時%M分"
json.content @message.content
json.image @message.image_url
json.created_at @message.created_at.to_s(:datetime)
json.user_name @message.user.name
json.id @message.id