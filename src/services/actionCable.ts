import { createConsumer } from "@rails/actioncable"

export default createConsumer('ws://localhost:3001/cable')