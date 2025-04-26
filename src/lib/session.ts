export function getSessionId() {
    let sessionId = localStorage.getItem("user-session-id");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("user-session-id", sessionId);
    }
  
    return sessionId;
  }
  
export function generateSession(name: string){
    let sessionId = localStorage.getItem("user-session-id");
    let username = localStorage.getItem("username");
    
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("user-session-id", sessionId);
    }
    if (!username) {
        localStorage.setItem("username", name);
      }
}
