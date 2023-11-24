// Notification Interface variables

export interface ActiveMQServiceConfig {
  brokerURL: string; // ActiveMQ broker URL
  username: string; // ActiveMQ username
  password: string; // ActiveMQ password
  // Add any other ActiveMQ configuration options here
}

export interface ActiveMQMessage {
  content: string; // Message content
  timestamp: number; // Timestamp of the message
}
