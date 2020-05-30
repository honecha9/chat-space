json.array! @users do |user|
  json.id user.id
  json.name user.name
end
# HTMLからjsonのコードに変換する作業をここで行う