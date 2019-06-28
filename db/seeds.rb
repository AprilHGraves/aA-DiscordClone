# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Server.destroy_all
ServerMembership.destroy_all
ServerInvite.destroy_all

u1 = User.create(email: "demo_user@comcast.net", username: "demoUser", password: "demodemo")
u2 = User.create(email: "pwispw@aol.com", username: "Captain Obvious", password: "pw")

s1 = Server.create(name: "Random Things", owner_id: u1.id)
s2 = Server.create(name: "Food Awesome", owner_id: u2.id)

ServerMembership.create(user_id: u1.id, server_id: s1.id)
ServerMembership.create(user_id: u2.id, server_id: s1.id)
ServerMembership.create(user_id: u1.id, nickname: "Lasagna", server_id: s2.id)
ServerMembership.create(user_id: u2.id, nickname: "Steak", server_id: s2.id)

ServerInvite.create(code: "a1B692", uses: 0, inviter_id: u1.id, server_id: s1.id, channel_id: 1)
ServerInvite.create(code: "91bZP7", uses: 0, inviter_id: u2.id, server_id: s2.id, channel_id: 2)