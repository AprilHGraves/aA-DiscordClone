json.extract! user, :id, :username, :tag, :email

if user.photo.attached?
  json.image_url url_for(user.photo)
else
  json.image_url asset_path('logo2.png')
end
