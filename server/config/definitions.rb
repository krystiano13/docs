# @!parse
#   class ActionController::Base
#     include ActionController::MimeResponds
#     extend ActiveSupport::Callbacks::ClassMethods
#     extend AbstractController::Callbacks::ClassMethods
#     include Sorcery::Controller::InstanceMethods 
#     ^^^^
#     this lets us see the Sorcery controller methods in our completions
#   end