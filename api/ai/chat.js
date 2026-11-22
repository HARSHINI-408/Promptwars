export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ message: 'Method not allowed' });
  }

  const message = String(request.body?.message || '').trim();
  if (!message) {
    return response.status(400).json({ message: 'Question is required' });
  }

  const lower = message.toLowerCase();
  let answer;
  if (lower.includes('5000') || lower.includes('5,000') || lower.includes('afford')) {
    answer = 'A ₹5,000 purchase from your ₹5,800 balance would leave about ₹800 after current monthly expenses are considered. That is high risk; keep at least ₹1,000 for planned costs.';
  } else if (lower.includes('save') || lower.includes('laptop') || lower.includes('goal')) {
    answer = 'To reach your ₹15,000 laptop goal from ₹4,000, you need ₹11,000. Saving ₹2,750 per month for 4 months will reach the goal if monthly expenses stay near ₹5,200.';
  } else if (lower.includes('balance') || lower.includes('month') || lower.includes('budget')) {
    answer = 'You have ₹8,000 income, ₹5,200 expenses, ₹4,000 savings, and ₹5,800 available balance. Keeping a ₹1,000 buffer and adding ₹600–₹800 to the laptop goal is a sensible next step.';
  } else {
    answer = 'Based on your CampusCash totals, prioritize a ₹1,000 safety buffer, keep monthly expenses near ₹5,200, and direct ₹600–₹800 toward your ₹15,000 laptop goal.';
  }

  return response.status(200).json({
    answer,
    source: 'CampusCash financial calculations',
    isEstimate: true
  });
}
