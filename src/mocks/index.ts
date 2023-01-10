
async function initMocks() {
  if (typeof window === 'undefined' && process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
    // console.log('server');
    const { server } = await import('./server');
    server.listen();
  } else if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
    // console.log('browser');
    const { worker } = await import('./browser');
    worker.start();
  }
}
export { }

initMocks();