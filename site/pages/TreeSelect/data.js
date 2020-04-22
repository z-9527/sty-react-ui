const items = [
  {
    text: '浙江',
    children: [
      {
        text: '杭州',
        id: '1'
      },
      {
        text: '温州',
        id: '2'
      },
      {
        text: '宁波',
        id: '3',
        disabled: true
      },
      {
        text: '义务',
        id: '4'
      }
    ]
  },
  {
    text: '江苏',
    children: [
      {
        text: '南京',
        id: '5'
      },
      {
        text: '无锡',
        id: '6'
      },
      {
        text: '徐州',
        id: '7'
      },
      {
        text: '苏州',
        id: '8'
      }
    ]
  },
  {
    text: '福建',
    disabled: true
  }
];

export default items;
