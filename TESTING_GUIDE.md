# 🧪 Testing Guide - Smart Customer Support Chatbot

Complete testing checklist to verify all features work correctly.

---

## ✅ Pre-Testing Setup

### 1. Environment Check

- [ ] Node.js installed (v18+)
- [ ] npm installed
- [ ] Backend dependencies installed (`cd backend && npm install`)
- [ ] Frontend dependencies installed (`cd frontend && npm install`)
- [ ] `.env` file exists in backend with valid `GEMINI_API_KEY`

### 2. Start Services

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] No console errors in terminal
- [ ] Browser opens successfully

---

## 🎯 Functional Testing

### Test 1: Initial Load

**Steps**:

1. Open http://localhost:5173
2. Observe the interface

**Expected Results**:

- [ ] Page loads without errors
- [ ] Header displays with rotating sparkle icon
- [ ] Welcome message from bot appears
- [ ] 4 quick question buttons visible
- [ ] Input field is focused and ready
- [ ] Send button is visible

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 2: Send Basic Message

**Steps**:

1. Type "Hello" in input field
2. Click Send button

**Expected Results**:

- [ ] Message appears on right side (purple bubble)
- [ ] Input field clears
- [ ] Typing indicator appears (animated dots)
- [ ] Bot response appears on left side (gray bubble)
- [ ] Both messages have timestamps
- [ ] Auto-scrolls to latest message

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 3: Quick Questions

**Steps**:

1. Click "What are your business hours?"

**Expected Results**:

- [ ] Question auto-fills in input
- [ ] Input field receives focus
- [ ] Can press Enter to send
- [ ] Bot responds with business hours
- [ ] Shows "1 FAQs" indicator

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 4: RAG - Single FAQ Retrieval

**Steps**:

1. Type "What are your hours?"
2. Send message

**Expected Results**:

- [ ] Bot retrieves business hours FAQ
- [ ] Response mentions "9:00 AM to 6:00 PM EST"
- [ ] Shows "1 FAQs" indicator
- [ ] Response is natural and conversational

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 5: RAG - Multiple FAQ Retrieval

**Steps**:

1. Type "Tell me about payments and refunds"
2. Send message

**Expected Results**:

- [ ] Bot retrieves multiple FAQs
- [ ] Shows "2 FAQs" or more indicator
- [ ] Response covers both payment methods AND refund policy
- [ ] Information is synthesized coherently

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 6: RAG - No Match (Hallucination Prevention)

**Steps**:

1. Type "What's the weather today?"
2. Send message

**Expected Results**:

- [ ] Bot doesn't make up weather information
- [ ] Politely states it cannot help
- [ ] Suggests contacting support
- [ ] Shows "0 FAQs" or no indicator

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 7: FAQ Browser Sidebar

**Steps**:

1. Click book icon in header
2. Observe sidebar

**Expected Results**:

- [ ] Sidebar slides in from right
- [ ] Backdrop overlay appears
- [ ] All 10 FAQs are visible
- [ ] Category filters show: All, General, Account, Billing, Orders, Shipping
- [ ] Each FAQ shows question, answer preview, and category tag

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 8: Category Filtering

**Steps**:

1. Open sidebar
2. Click "Billing" category
3. Observe filtered results

**Expected Results**:

- [ ] Only billing-related FAQs shown
- [ ] "Billing" button is highlighted
- [ ] Other categories still clickable
- [ ] Click "All" to see all FAQs again

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 9: FAQ Click-to-Ask

**Steps**:

1. Open sidebar
2. Click any FAQ
3. Observe behavior

**Expected Results**:

- [ ] Sidebar closes smoothly
- [ ] FAQ question appears in input field
- [ ] Input field receives focus
- [ ] Can send immediately

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 10: Export Chat

**Steps**:

1. Have a conversation (3-4 messages)
2. Click download icon in header
3. Check downloaded file

**Expected Results**:

- [ ] File downloads automatically
- [ ] Filename includes timestamp
- [ ] File contains all messages
- [ ] Format: `[timestamp] SENDER: message`
- [ ] Readable in text editor

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 11: Clear Chat

**Steps**:

1. Have a conversation
2. Click trash icon in header
3. Observe result

**Expected Results**:

- [ ] All messages cleared
- [ ] Welcome message reappears
- [ ] Quick questions show again
- [ ] Input field is empty and focused

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 12: Keyboard Interaction

**Steps**:

1. Type message
2. Press Enter key
3. Observe behavior

**Expected Results**:

- [ ] Message sends on Enter
- [ ] No need to click Send button
- [ ] Input clears after send
- [ ] Focus remains on input

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 13: Loading States

**Steps**:

1. Send a message
2. Observe during API call

**Expected Results**:

- [ ] Typing indicator appears
- [ ] Send button is disabled
- [ ] Input field is disabled
- [ ] Cannot send another message
- [ ] UI remains responsive

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 14: Error Handling

**Steps**:

1. Stop backend server
2. Try to send a message
3. Observe error handling

**Expected Results**:

- [ ] Error message appears from bot
- [ ] Message says "Sorry, I encountered an error"
- [ ] Error message has red styling
- [ ] Can try again after restarting backend

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 15: Message History

**Steps**:

1. Send 5-6 messages
2. Scroll up to see older messages
3. Send new message

**Expected Results**:

- [ ] All messages preserved
- [ ] Can scroll through history
- [ ] New message auto-scrolls to bottom
- [ ] Timestamps accurate

**Status**: ⬜ Pass / ⬜ Fail

---

## 🎨 UI/UX Testing

### Test 16: Animations

**Check**:

- [ ] Messages fade and slide in smoothly
- [ ] Sparkle icon rotates continuously
- [ ] Buttons scale on hover
- [ ] Sidebar slides in/out smoothly
- [ ] Typing indicator dots bounce
- [ ] No janky or stuttering animations

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 17: Responsive Design

**Steps**:

1. Resize browser window
2. Test at different widths

**Expected Results**:

- [ ] Layout adapts to screen size
- [ ] Text remains readable
- [ ] Buttons remain clickable
- [ ] Sidebar adapts on mobile
- [ ] No horizontal scrolling

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 18: Visual Consistency

**Check**:

- [ ] Colors match throughout (indigo/purple theme)
- [ ] Spacing is consistent
- [ ] Border radius consistent
- [ ] Font sizes appropriate
- [ ] Icons aligned properly

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 19: Hover Effects

**Check**:

- [ ] Buttons scale on hover
- [ ] Messages scale slightly on hover
- [ ] Header buttons show hover state
- [ ] Quick question buttons change color
- [ ] FAQ items highlight on hover

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 20: Scrollbar

**Check**:

- [ ] Custom scrollbar visible
- [ ] Matches theme colors (indigo/purple)
- [ ] Smooth scrolling
- [ ] Hover effect on scrollbar

**Status**: ⬜ Pass / ⬜ Fail

---

## 🔧 Backend Testing

### Test 21: Health Check Endpoint

**Steps**:

1. Open http://localhost:5000/api/health in browser

**Expected Results**:

- [ ] Returns JSON: `{"status":"ok","message":"Server is running"}`
- [ ] Status code 200

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 22: Get FAQs Endpoint

**Steps**:

1. Open http://localhost:5000/api/faqs in browser

**Expected Results**:

- [ ] Returns JSON array of 10 FAQs
- [ ] Each FAQ has id, question, answer, category
- [ ] Status code 200

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 23: Chat Endpoint (via Postman/curl)

**Steps**:

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What are your hours?"}'
```

**Expected Results**:

- [ ] Returns JSON with `response` and `retrievedFAQs`
- [ ] Response is relevant to query
- [ ] Status code 200

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 24: Database Initialization

**Steps**:

1. Delete `backend/faqs.db`
2. Restart backend
3. Check database

**Expected Results**:

- [ ] Database file recreates automatically
- [ ] Table `faqs` exists
- [ ] 10 sample FAQs inserted
- [ ] Console shows "Sample FAQs inserted successfully"

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 25: SQL Injection Prevention

**Steps**:

1. Try sending: `'; DROP TABLE faqs; --`
2. Check database

**Expected Results**:

- [ ] Query doesn't execute malicious SQL
- [ ] Database remains intact
- [ ] Bot responds normally or with error
- [ ] No data loss

**Status**: ⬜ Pass / ⬜ Fail

---

## 🔐 Security Testing

### Test 26: CORS Configuration

**Steps**:

1. Try accessing API from different origin
2. Check browser console

**Expected Results**:

- [ ] CORS headers present
- [ ] Localhost allowed
- [ ] Other origins blocked (in production)

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 27: Environment Variables

**Steps**:

1. Check if .env is in .gitignore
2. Verify API key not in code

**Expected Results**:

- [ ] .env file not committed to git
- [ ] API key loaded from environment
- [ ] No hardcoded secrets

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 28: Input Validation

**Steps**:

1. Send empty message
2. Send very long message (1000+ chars)
3. Send special characters

**Expected Results**:

- [ ] Empty message doesn't send
- [ ] Long messages handled gracefully
- [ ] Special characters don't break system

**Status**: ⬜ Pass / ⬜ Fail

---

## ⚡ Performance Testing

### Test 29: Response Time

**Steps**:

1. Send 5 different queries
2. Measure response times

**Expected Results**:

- [ ] Database query: < 100ms
- [ ] Total response: 1-3 seconds
- [ ] Consistent performance
- [ ] No timeouts

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 30: Concurrent Requests

**Steps**:

1. Open multiple browser tabs
2. Send messages from each

**Expected Results**:

- [ ] All requests handled
- [ ] No race conditions
- [ ] Responses correct
- [ ] No server crashes

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 31: Memory Leaks

**Steps**:

1. Send 20+ messages
2. Check browser memory usage

**Expected Results**:

- [ ] Memory usage stable
- [ ] No continuous growth
- [ ] Browser remains responsive

**Status**: ⬜ Pass / ⬜ Fail

---

## 🌐 Browser Compatibility

### Test 32: Chrome

- [ ] All features work
- [ ] Animations smooth
- [ ] No console errors

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 33: Firefox

- [ ] All features work
- [ ] Animations smooth
- [ ] No console errors

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 34: Safari

- [ ] All features work
- [ ] Animations smooth
- [ ] No console errors

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 35: Edge

- [ ] All features work
- [ ] Animations smooth
- [ ] No console errors

**Status**: ⬜ Pass / ⬜ Fail

---

## 📱 Mobile Testing

### Test 36: Mobile Chrome

- [ ] Layout responsive
- [ ] Touch interactions work
- [ ] Sidebar adapts
- [ ] Keyboard doesn't break layout

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 37: Mobile Safari

- [ ] Layout responsive
- [ ] Touch interactions work
- [ ] Sidebar adapts
- [ ] Keyboard doesn't break layout

**Status**: ⬜ Pass / ⬜ Fail

---

## 🎯 RAG-Specific Testing

### Test 38: Keyword Extraction

**Test Queries**:

- "hours" → Should find business hours
- "password reset" → Should find password FAQ
- "pay" → Should find payment methods

**Expected Results**:

- [ ] Keywords extracted correctly
- [ ] Relevant FAQs retrieved
- [ ] Short words (< 3 chars) ignored

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 39: Context Augmentation

**Steps**:

1. Check backend logs during query
2. Verify prompt structure

**Expected Results**:

- [ ] Context section includes retrieved FAQs
- [ ] User query included
- [ ] Instructions clear
- [ ] Format consistent

**Status**: ⬜ Pass / ⬜ Fail

---

### Test 40: Grounding Enforcement

**Test Queries**:

- "What's 2+2?" (math, not in FAQs)
- "Who is the president?" (current events)
- "Write me a poem" (creative task)

**Expected Results**:

- [ ] Bot doesn't answer off-topic questions
- [ ] Politely declines
- [ ] Suggests contacting support
- [ ] No hallucination

**Status**: ⬜ Pass / ⬜ Fail

---

## 📊 Test Summary

### Overall Results

- **Total Tests**: 40
- **Passed**: \_\_\_
- **Failed**: \_\_\_
- **Pass Rate**: \_\_\_%

### Critical Issues

List any critical bugs found:

1.
2.
3.

### Minor Issues

List any minor issues:

1.
2.
3.

### Recommendations

List improvements:

1.
2.
3.

---

## 🐛 Bug Report Template

If you find a bug, document it:

**Bug ID**: #**_  
**Severity**: Critical / Major / Minor  
**Test**: Test #_**

**Description**:
[What happened]

**Steps to Reproduce**:

1.
2.
3.

**Expected Behavior**:
[What should happen]

**Actual Behavior**:
[What actually happened]

**Screenshots**:
[If applicable]

**Environment**:

- OS:
- Browser:
- Node version:

---

## ✅ Sign-Off

**Tested By**: ******\_\_\_******  
**Date**: ******\_\_\_******  
**Version**: 1.0.0  
**Status**: ⬜ Approved / ⬜ Needs Fixes

**Notes**:

---

---

---

---

## 🚀 Next Steps After Testing

If all tests pass:

- [ ] Update documentation with any findings
- [ ] Prepare for deployment
- [ ] Create production build
- [ ] Set up monitoring

If tests fail:

- [ ] Document all bugs
- [ ] Prioritize fixes
- [ ] Fix critical issues first
- [ ] Retest after fixes

---

**Happy Testing!** 🧪✨
