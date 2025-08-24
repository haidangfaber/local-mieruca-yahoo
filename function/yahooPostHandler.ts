export const handler = async (event: any) => {
  console.log('Received SQS event:', JSON.stringify(event));
  // Xử lý message ở đây
  return {};
};