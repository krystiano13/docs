class DocumentsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "documents_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
