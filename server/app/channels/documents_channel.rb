class DocumentsChannel < ApplicationCable::Channel
  def subscribed
    stream_for "documents_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
