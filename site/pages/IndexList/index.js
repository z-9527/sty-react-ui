import React, { Component } from 'react';
import { IndexList } from '@components';
import renderHeader from '../renderHeader';

const { Section, Cell } = IndexList;

const NAMES = ['Aaron', 'Alden', 'Austin', 'Baldwin', 'Braden', 'Carl', 'Chandler', 'Clyde', 'David', 'Edgar', 'Elton', 'Floyd', 'Freeman', 'Gavin', 'Hector', 'Henry', 'Ian', 'Jason', 'Joshua', 'Kane', 'Lambert', 'Matthew', 'Morgan', 'Neville', 'Oliver', 'Oscar', 'Perry', 'Quinn', 'Ramsey', 'Scott', 'Seth', 'Spencer', 'Timothy', 'Todd', 'Trevor', 'Udolf', 'Victor', 'Vincent', 'Walton', 'Willis', 'Xavier', 'Yvonne', 'Zack', 'Zane'];
const list = [];
'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
  const cells = NAMES.filter(i => i[0] === letter);
  list.push({
    index: letter,
    cells
  });
});

@renderHeader('IndexList')
class IndexListPage extends Component {
  state = {}
  render() {
    return (
      <div className='demo-box'>
        <IndexList>
          {list.map(item => (
            <Section key={item.index} index={item.index}>
              {item.cells.map(cell => (
                <Cell key={cell} onClick={() => console.log(11, cell)}>
                  {cell}
                </Cell>
              ))}
            </Section>
          ))}
        </IndexList>
      </div>
    );
  }
}

export default IndexListPage;
