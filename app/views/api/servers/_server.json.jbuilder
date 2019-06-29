json.extract! server, :id, :name, :owner_id

if server.photo.attached?
  json.image_url url_for(server.photo)
else
  json.image_url asset_path('logo2.png')
end
