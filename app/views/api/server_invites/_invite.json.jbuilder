json.extract! invite, :id, :code, :uses, :max_uses, :inviter_id, :server_id, :channel_id, :created_at

json.expire_date (invite.expire_date.to_f * 1000)