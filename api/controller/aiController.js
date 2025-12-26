const fs = require('fs');
const path = require('path');

// Load FAQ database (JSON)
const faqPath = path.join(__dirname, '..', 'data', 'ai_faq.json');
let faq = [];
try {
  faq = JSON.parse(fs.readFileSync(faqPath, 'utf8'));
} catch (err) {
  console.error('Could not load AI FAQ DB:', err.message);
}

// Simple search: match any variant token in question
function findMatches(question) {
  if (!question) return [];
  const q = question.toLowerCase();
  const results = [];

  for (const item of faq) {
    for (const v of item.question_variants || []) {
      if (q.includes(v.toLowerCase())) {
        results.push(item);
        break;
      }
    }
  }

  return results;
}

// Controller: return JSON array of { answer }
exports.searchFaq = (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'question is required' });

    const matches = findMatches(question);

    if (matches.length === 0) {
      // fallback: return a generic reply prompting for clarification
      return res.json([
        { answer: 'Xin lỗi, tôi chưa hiểu. Bạn có thể hỏi rõ hơn về: giờ mở cửa, giá dịch vụ, địa chỉ, cách đặt lịch, v.v.' }
      ]);
    }

    // Map to array of answers
    const answers = matches.map(m => ({ answer: m.answer, data: m }));
    return res.json(answers);
  } catch (err) {
    console.error('AI FAQ error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};