const quotes = [
  { text: '自律给我自由', author: 'KEEP' },
  { text: '伟大的事业，始于微不足道的开始', author: '未知' },
  { text: '今天不想跑，所以才去跑', author: '村上春树' },
  { text: '你的身体是你所有故事的开端', author: '未知' },
  { text: '汗水不会说谎', author: '健身格言' },
  { text: '每一次坚持，都在雕刻更好的自己', author: '未知' },
  { text: '疼痛是暂时的，放弃是永远的', author: '未知' },
  { text: '不要低估你改变自己的能力', author: '未知' },
  { text: '健身是最诚实的付出——你投入多少，就收获多少', author: '未知' },
  { text: '别人在睡觉，你在奔跑，这就是差距', author: '健身格言' },
  { text: '你的极限，只存在于你的脑海中', author: '未知' },
  { text: '动起来，就赢了大多数躺着的人', author: '健身格言' },
  { text: '改变不会发生在舒适区', author: '未知' },
  { text: '每一次重复，都在远离昨天的自己', author: '未知' },
  { text: '身体不是唯一的目的，但它是承载所有目的的容器', author: '未知' },
  { text: '种一棵树最好的时间是十年前，其次是现在', author: '佚名' },
  { text: '钢铁不是一天炼成的，但每一天都在炼', author: '健身格言' },
  { text: '你流的每一滴汗，都在照亮未来的路', author: '未知' },
  { text: '坚持不是因为看到希望，而是因为坚持才有希望', author: '未知' },
  { text: '不要等待完美时机，现在就是最好的开始', author: '健身格言' },
]

export function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)]
}

export default quotes
