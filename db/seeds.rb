# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'

User.destroy_all
Server.destroy_all
ServerMembership.destroy_all
Channel.destroy_all
ServerInvite.destroy_all

u1 = User.create(email: "demo_user@comcast.net", username: "demoUser", password: "demodemo")
u2 = User.create(email: "pwispw@aol.com", username: "Captain Obvious", password: "pw")

file1 = open('https://s3.amazonaws.com/discordclone-seed/puppy.jpeg')
u1.photo.attach(io: file1, filename: 'puppy.jpeg')

s1 = Server.create(name: "Food Awesome", owner_id: u1.id)
s2 = Server.create(name: "Cats", owner_id: u2.id)

file2 = open('https://s3.amazonaws.com/discordclone-seed/bacon.jpeg')
s1.photo.attach(io: file2, filename: 'bacon.jpeg')

ServerMembership.create(user_id: u1.id, nickname: "Lasagna", server_id: s1.id)
ServerMembership.create(user_id: u2.id, nickname: "Steak", server_id: s1.id)
ServerMembership.create(user_id: u1.id, server_id: s2.id)
ServerMembership.create(user_id: u2.id, server_id: s2.id)

c1 = Channel.create(name: "general", server_id: s1.id)
Channel.create(name: "the-cooking-channel", server_id: s1.id, topic: "Share your favorite recipies")
c2 = Channel.create(name: "general", server_id: s2.id, topic: "Welcome, Food Enthusiast")
Channel.create(name: "discuss-your-kitty", server_id: s2.id)

ServerInvite.create(uses: 0, inviter_id: u1.id, server_id: s1.id, channel_id: c1.id)
ServerInvite.create(uses: 0, inviter_id: u2.id, server_id: s2.id, channel_id: c2.id)