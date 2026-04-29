const exercises = [
  {
    id: 'chest-1', name: '标准俯卧撑', englishName: 'Standard Push-up',
    muscleGroup: 'chest', difficulty: 'beginner', equipment: 'none',
    description: '双手略宽于肩，身体保持一条直线，屈肘下降至胸部接近地面，然后推起。',
    tips: '核心收紧，不要塌腰或撅臀',
    muscles: ['胸大肌', '肱三头肌', '三角肌前束']
  },
  {
    id: 'chest-2', name: '宽距俯卧撑', englishName: 'Wide Push-up',
    muscleGroup: 'chest', difficulty: 'beginner', equipment: 'none',
    description: '双手距离约为肩宽的1.5倍，侧重刺激胸肌外侧。',
    tips: '下降时肘部向外打开约45度',
    muscles: ['胸大肌（外侧）', '肱三头肌', '三角肌前束']
  },
  {
    id: 'chest-3', name: '钻石俯卧撑', englishName: 'Diamond Push-up',
    muscleGroup: 'chest', difficulty: 'intermediate', equipment: 'none',
    description: '双手食指和拇指相触形成钻石形状置于胸部下方，侧重三头肌和胸肌中缝。',
    tips: '肘部贴近身体两侧',
    muscles: ['肱三头肌', '胸大肌（中缝）', '三角肌前束']
  },
  {
    id: 'chest-4', name: '下斜俯卧撑', englishName: 'Decline Push-up',
    muscleGroup: 'chest', difficulty: 'intermediate', equipment: 'none',
    description: '双脚垫高（椅子/床），身体呈下斜姿势做俯卧撑，侧重上胸。',
    tips: '角度越大难度越高，初学者可从低高度开始',
    muscles: ['胸大肌（上胸）', '三角肌前束', '肱三头肌']
  },
  {
    id: 'chest-5', name: '上斜俯卧撑', englishName: 'Incline Push-up',
    muscleGroup: 'chest', difficulty: 'beginner', equipment: 'none',
    description: '双手撑在椅子/床沿上做俯卧撑，适合初学者或作为热身。',
    tips: '身体角度越垂直越轻松',
    muscles: ['胸大肌（下胸）', '肱三头肌', '三角肌前束']
  },
  {
    id: 'chest-6', name: '哑铃卧推', englishName: 'Dumbbell Bench Press',
    muscleGroup: 'chest', difficulty: 'intermediate', equipment: 'dumbbell',
    description: '仰卧在凳上或地上，双手持哑铃于胸部两侧，向上推起至手臂伸直。',
    tips: '下落时控制速度，感受胸肌拉伸',
    muscles: ['胸大肌', '肱三头肌', '三角肌前束']
  },
  {
    id: 'chest-7', name: '哑铃飞鸟', englishName: 'Dumbbell Fly',
    muscleGroup: 'chest', difficulty: 'intermediate', equipment: 'dumbbell',
    description: '仰卧双手持哑铃于胸部上方，手臂微弯，向两侧打开再合拢，像抱大树。',
    tips: '手肘保持微弯固定角度，不要伸直',
    muscles: ['胸大肌', '三角肌前束']
  },

  {
    id: 'back-1', name: '引体向上', englishName: 'Pull-up',
    muscleGroup: 'back', difficulty: 'advanced', equipment: 'bar',
    description: '双手正握单杠略宽于肩，身体悬垂，背肌发力将身体拉起至下巴过杠。',
    tips: '不要借助惯性摆动身体，下落时控制速度',
    muscles: ['背阔肌', '肱二头肌', '斜方肌']
  },
  {
    id: 'back-2', name: '澳式引体向上', englishName: 'Australian Pull-up',
    muscleGroup: 'back', difficulty: 'beginner', equipment: 'bar',
    description: '单杠调至腰部高度，身体倾斜悬垂，脚跟着地，将胸部拉向单杠。',
    tips: '身体越水平难度越大，可调整角度',
    muscles: ['背阔肌', '肱二头肌', '斜方肌']
  },
  {
    id: 'back-3', name: '哑铃划船', englishName: 'Dumbbell Row',
    muscleGroup: 'back', difficulty: 'intermediate', equipment: 'dumbbell',
    description: '单膝跪在凳上，另一只手持哑铃，背部保持平直，将哑铃提拉至腰部。',
    tips: '肘部夹紧身体，不要耸肩',
    muscles: ['背阔肌', '斜方肌', '肱二头肌']
  },
  {
    id: 'back-4', name: '超人式', englishName: 'Superman',
    muscleGroup: 'back', difficulty: 'beginner', equipment: 'none',
    description: '俯卧在地，同时抬起双臂和双腿，保持2秒后缓慢放下。',
    tips: '感受背部肌肉的收缩，不要用颈部发力',
    muscles: ['竖脊肌', '臀大肌', '斜方肌']
  },
  {
    id: 'back-5', name: '俯身飞鸟', englishName: 'Bent-over Reverse Fly',
    muscleGroup: 'back', difficulty: 'intermediate', equipment: 'dumbbell',
    description: '俯身至上半身与地面平行，双手持哑铃自然下垂，向两侧打开手臂。',
    tips: '肩胛骨向中间夹紧，手肘微弯',
    muscles: ['三角肌后束', '斜方肌中下', '菱形肌']
  },

  {
    id: 'legs-1', name: '徒手深蹲', englishName: 'Bodyweight Squat',
    muscleGroup: 'legs', difficulty: 'beginner', equipment: 'none',
    description: '双脚与肩同宽，脚尖略微朝外，屈髋屈膝下蹲至大腿与地面平行。',
    tips: '膝盖与脚尖方向一致，背部保持挺直',
    muscles: ['股四头肌', '臀大肌', '腘绳肌']
  },
  {
    id: 'legs-2', name: '弓步蹲', englishName: 'Lunge',
    muscleGroup: 'legs', difficulty: 'beginner', equipment: 'none',
    description: '单脚向前跨出一大步，屈膝下蹲至双腿均呈90度角，交替进行。',
    tips: '前膝不超过脚尖，上身保持直立',
    muscles: ['股四头肌', '臀大肌', '腘绳肌']
  },
  {
    id: 'legs-3', name: '保加利亚分腿蹲', englishName: 'Bulgarian Split Squat',
    muscleGroup: 'legs', difficulty: 'intermediate', equipment: 'dumbbell',
    description: '后脚搭在椅子/床沿上，前腿下蹲至大腿与地面平行。',
    tips: '重心放在前脚脚跟，躯干略微前倾',
    muscles: ['股四头肌', '臀大肌', '腘绳肌']
  },
  {
    id: 'legs-4', name: '哑铃深蹲', englishName: 'Goblet Squat',
    muscleGroup: 'legs', difficulty: 'intermediate', equipment: 'dumbbell',
    description: '双手捧住哑铃置于胸前做深蹲，有助于保持上半身直立。',
    tips: '手肘触碰膝盖作为深度参考',
    muscles: ['股四头肌', '臀大肌', '核心']
  },
  {
    id: 'legs-5', name: '臀桥', englishName: 'Glute Bridge',
    muscleGroup: 'legs', difficulty: 'beginner', equipment: 'none',
    description: '仰卧屈膝，双脚平放地面，收紧臀部将髋部向上顶起至身体成直线。',
    tips: '顶部挤压臀部保持2秒',
    muscles: ['臀大肌', '腘绳肌', '下背']
  },
  {
    id: 'legs-6', name: '提踵', englishName: 'Calf Raise',
    muscleGroup: 'legs', difficulty: 'beginner', equipment: 'none',
    description: '站立踮起脚尖至最高点，缓慢放下。可单脚做增加难度。',
    tips: '在顶端停留1秒再缓慢下落',
    muscles: ['腓肠肌', '比目鱼肌']
  },
  {
    id: 'legs-7', name: '跳跃深蹲', englishName: 'Jump Squat',
    muscleGroup: 'legs', difficulty: 'intermediate', equipment: 'none',
    description: '深蹲到底后爆发跳起，落地时缓冲回深蹲姿势。',
    tips: '落地要轻，膝盖微屈缓冲',
    muscles: ['股四头肌', '臀大肌', '腓肠肌']
  },

  {
    id: 'shoulder-1', name: '哑铃推举', englishName: 'Dumbbell Shoulder Press',
    muscleGroup: 'shoulders', difficulty: 'intermediate', equipment: 'dumbbell',
    description: '坐姿或站姿，双手持哑铃于肩部两侧，向上推举至头顶。',
    tips: '核心收紧，不要过度后仰借力',
    muscles: ['三角肌前束', '三角肌中束', '肱三头肌']
  },
  {
    id: 'shoulder-2', name: '哑铃侧平举', englishName: 'Dumbbell Lateral Raise',
    muscleGroup: 'shoulders', difficulty: 'intermediate', equipment: 'dumbbell',
    description: '双手持哑铃于身体两侧，微屈肘，向两侧抬起至与肩同高。',
    tips: '不要耸肩，用肩发力而非手臂',
    muscles: ['三角肌中束', '斜方肌上']
  },
  {
    id: 'shoulder-3', name: '哑铃前平举', englishName: 'Dumbbell Front Raise',
    muscleGroup: 'shoulders', difficulty: 'beginner', equipment: 'dumbbell',
    description: '双手持哑铃于大腿前方，保持手臂伸直向前抬起至与肩同高。',
    tips: '控制速度，不要借助惯性',
    muscles: ['三角肌前束', '胸大肌上部']
  },
  {
    id: 'shoulder-4', name: '倒立撑（派克俯卧撑）', englishName: 'Pike Push-up',
    muscleGroup: 'shoulders', difficulty: 'advanced', equipment: 'none',
    description: '俯身呈倒V形（臀部高举），屈肘头部向地面靠近再推起。',
    tips: '目标是锻炼肩部力量，为倒立撑做准备',
    muscles: ['三角肌前束', '肱三头肌', '核心']
  },

  {
    id: 'arms-1', name: '哑铃弯举', englishName: 'Dumbbell Curl',
    muscleGroup: 'arms', difficulty: 'beginner', equipment: 'dumbbell',
    description: '站立手持哑铃于身体两侧，掌心向前，屈肘将哑铃举至肩前。',
    tips: '肘部固定在身体两侧不动，不要晃动借力',
    muscles: ['肱二头肌', '肱肌']
  },
  {
    id: 'arms-2', name: '锤式弯举', englishName: 'Hammer Curl',
    muscleGroup: 'arms', difficulty: 'beginner', equipment: 'dumbbell',
    description: '手持哑铃掌心相对（像握锤子），弯举哑铃至肩前。',
    tips: '侧重发展肱肌，增加手臂围度视觉效果',
    muscles: ['肱二头肌', '肱肌', '肱桡肌']
  },
  {
    id: 'arms-3', name: '三头肌臂屈伸', englishName: 'Tricep Dip',
    muscleGroup: 'arms', difficulty: 'intermediate', equipment: 'none',
    description: '双手撑在椅子边缘，身体悬空，屈肘下降再推起。',
    tips: '肘部朝后，不要向外打开',
    muscles: ['肱三头肌', '胸大肌下沿', '三角肌前束']
  },
  {
    id: 'arms-4', name: '俯身三头肌伸展', englishName: 'Bent-over Tricep Extension',
    muscleGroup: 'arms', difficulty: 'intermediate', equipment: 'dumbbell',
    description: '俯身至上半身与地面平行，上臂贴紧身侧，前臂向后伸直。',
    tips: '上臂保持固定不动，只有前臂运动',
    muscles: ['肱三头肌']
  },
  {
    id: 'arms-5', name: '集中弯举', englishName: 'Concentration Curl',
    muscleGroup: 'arms', difficulty: 'beginner', equipment: 'dumbbell',
    description: '坐姿，手肘抵在大腿内侧，弯举哑铃至肩部。',
    tips: '顶峰收缩时感受二头肌的挤压',
    muscles: ['肱二头肌', '肱肌']
  },

  {
    id: 'core-1', name: '平板支撑', englishName: 'Plank',
    muscleGroup: 'core', difficulty: 'beginner', equipment: 'none',
    description: '俯卧，前臂和脚尖支撑身体，身体呈一条直线，保持姿势。',
    tips: '核心收紧，不要塌腰或抬臀',
    muscles: ['腹横肌', '腹直肌', '竖脊肌']
  },
  {
    id: 'core-2', name: '卷腹', englishName: 'Crunch',
    muscleGroup: 'core', difficulty: 'beginner', equipment: 'none',
    description: '仰卧屈膝，双手置于耳侧，卷起上背部离开地面。',
    tips: '下背部始终贴地，用腹肌发力而非颈部',
    muscles: ['腹直肌']
  },
  {
    id: 'core-3', name: '俄罗斯转体', englishName: 'Russian Twist',
    muscleGroup: 'core', difficulty: 'intermediate', equipment: 'none',
    description: '坐姿，双腿抬起离地，上身向后微倾，双手合十左右转动。',
    tips: '双脚离地难度更大，可持重物增加难度',
    muscles: ['腹斜肌', '腹直肌', '髋屈肌']
  },
  {
    id: 'core-4', name: '仰卧抬腿', englishName: 'Leg Raise',
    muscleGroup: 'core', difficulty: 'intermediate', equipment: 'none',
    description: '仰卧，双手置于臀下或身体两侧，双腿并拢伸直抬起至与地面垂直。',
    tips: '下背部贴地，用下腹发力抬腿',
    muscles: ['腹直肌（下腹）', '髋屈肌']
  },
  {
    id: 'core-5', name: '登山者', englishName: 'Mountain Climber',
    muscleGroup: 'core', difficulty: 'intermediate', equipment: 'none',
    description: '俯卧撑姿势，交替将膝盖提向胸部，速度越快强度越高。',
    tips: '保持核心稳定，不要左右晃动',
    muscles: ['腹直肌', '髋屈肌', '肩部']
  },
  {
    id: 'core-6', name: '自行车卷腹', englishName: 'Bicycle Crunch',
    muscleGroup: 'core', difficulty: 'intermediate', equipment: 'none',
    description: '仰卧，手置耳后，交替将对侧手肘和膝盖靠近，像蹬自行车。',
    tips: '动作放慢感受腹斜肌的收缩',
    muscles: ['腹斜肌', '腹直肌']
  },
  {
    id: 'core-7', name: '死虫式', englishName: 'Dead Bug',
    muscleGroup: 'core', difficulty: 'beginner', equipment: 'none',
    description: '仰卧，双臂举起与肩垂直，双腿抬起呈90度，交替伸直对侧手脚。',
    tips: '下背部始终贴地，这是核心稳定的基础训练',
    muscles: ['腹横肌', '腹直肌', '髋屈肌']
  },

  {
    id: 'cardio-1', name: '波比跳', englishName: 'Burpee',
    muscleGroup: 'fullbody', difficulty: 'intermediate', equipment: 'none',
    description: '站立→下蹲双手撑地→双脚后跳成俯卧撑姿势→双脚跳回→站起跳起。',
    tips: '全速完成，这是最高效的燃脂动作之一',
    muscles: ['全身', '核心', '腿部']
  },
  {
    id: 'cardio-2', name: '开合跳', englishName: 'Jumping Jack',
    muscleGroup: 'fullbody', difficulty: 'beginner', equipment: 'none',
    description: '站立时双脚并拢双手下垂，跳起时双脚分开双手在头顶击掌。',
    tips: '作为热身或心肺训练效果很好',
    muscles: ['全身', '肩部', '腿部']
  },
  {
    id: 'cardio-3', name: '高抬腿', englishName: 'High Knees',
    muscleGroup: 'fullbody', difficulty: 'beginner', equipment: 'none',
    description: '原地跑步，交替将膝盖尽可能抬高至腰部以上。',
    tips: '核心收紧，保持快速节奏',
    muscles: ['髋屈肌', '股四头肌', '核心']
  },
  {
    id: 'cardio-4', name: '深蹲跳', englishName: 'Squat Jump',
    muscleGroup: 'fullbody', difficulty: 'intermediate', equipment: 'none',
    description: '深蹲到底后爆发跳起，双臂向上摆动助力，落地缓冲回深蹲。',
    tips: '尽量跳高，落地轻盈',
    muscles: ['股四头肌', '臀大肌', '腓肠肌']
  },

  {
    id: 'gripper-1', name: '臂力棒前压', englishName: 'Spring Bar Chest Press',
    muscleGroup: 'chest', difficulty: 'beginner', equipment: 'gripper',
    description: '双手握住臂力棒两端于胸前，用力向中间弯折至U型，缓慢回收。',
    tips: '保持核心收紧，控制回收速度防止反弹',
    muscles: ['胸大肌', '肱三头肌', '前臂']
  },
  {
    id: 'gripper-2', name: '臂力棒过顶压', englishName: 'Overhead Spring Bar Press',
    muscleGroup: 'shoulders', difficulty: 'intermediate', equipment: 'gripper',
    description: '双手握住臂力棒举过头顶，用力弯折臂力棒，感受肩部和手臂发力。',
    tips: '保持手臂微弯，不要完全锁死肘关节',
    muscles: ['三角肌', '肱三头肌', '前臂']
  },
  {
    id: 'gripper-3', name: '臂力棒颈后弯折', englishName: 'Behind Neck Spring Bar',
    muscleGroup: 'arms', difficulty: 'intermediate', equipment: 'gripper',
    description: '将臂力棒置于颈后，双手握两端用力弯折，锻炼手臂和肩部。',
    tips: '注意安全，初次使用选择弹力较小的臂力棒',
    muscles: ['肱三头肌', '三角肌', '前臂']
  },
  {
    id: 'gripper-4', name: '握力器挤压', englishName: 'Grip Crusher',
    muscleGroup: 'arms', difficulty: 'beginner', equipment: 'gripper',
    description: '单手持握力器，用力握紧至完全闭合，缓慢松开。',
    tips: '全程控制，每只手交替进行',
    muscles: ['前臂屈肌', '手部肌肉']
  },
  {
    id: 'gripper-5', name: '腕力训练', englishName: 'Wrist Curl',
    muscleGroup: 'arms', difficulty: 'beginner', equipment: 'gripper',
    description: '坐姿前臂置于大腿上，手腕悬空，手持握力器做腕屈伸动作。',
    tips: '动作幅度要完整，感受前臂的酸胀感',
    muscles: ['前臂屈肌', '前臂伸肌']
  },
  {
    id: 'gripper-6', name: '臂力棒弓步扭转', englishName: 'Lunge Twist with Spring Bar',
    muscleGroup: 'fullbody', difficulty: 'intermediate', equipment: 'gripper',
    description: '弓步姿势，双手握臂力棒于胸前水平弯折，同时向弓步侧扭转。',
    tips: '利用核心发力扭转，不要只靠手臂',
    muscles: ['核心', '胸大肌', '腿部']
  }
]

export const muscleGroups = [
  { id: 'all', name: '全部', icon: '🔥' },
  { id: 'chest', name: '胸部', icon: '🏋️' },
  { id: 'back', name: '背部', icon: '🔙' },
  { id: 'legs', name: '腿部', icon: '🦵' },
  { id: 'shoulders', name: '肩部', icon: '💪' },
  { id: 'arms', name: '手臂', icon: '💪' },
  { id: 'core', name: '核心', icon: '🧠' },
  { id: 'fullbody', name: '全身/有氧', icon: '🔥' }
]

export const difficultyLabels = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级'
}

export const equipmentLabels = {
  none: '无器械',
  dumbbell: '哑铃',
  bar: '单杠',
  gripper: '臂力棒'
}

export const muscleGroupNames = {
  chest: '胸部', back: '背部', legs: '腿部',
  shoulders: '肩部', arms: '手臂', core: '核心', fullbody: '全身'
}

export const muscleGroupGradients = {
  chest: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
  back: 'linear-gradient(135deg, #4834d4, #686de0)',
  legs: 'linear-gradient(135deg, #6ab04c, #badc58)',
  shoulders: 'linear-gradient(135deg, #f093fb, #f5576c)',
  arms: 'linear-gradient(135deg, #4facfe, #00f2fe)',
  core: 'linear-gradient(135deg, #fa8231, #f7b731)',
  fullbody: 'linear-gradient(135deg, #a55eea, #8854d0)'
}

export const muscleGroupEmojis = {
  chest: '🏋️',
  back: '🔙',
  legs: '🦵',
  shoulders: '💪',
  arms: '💪',
  core: '🧠',
  fullbody: '🔥'
}

export default exercises
