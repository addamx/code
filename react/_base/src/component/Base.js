import React from 'react';
import ReactDOM from 'react-dom';

//受控组件 (类似vue的v-modol)
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '相当于Vue的v-model',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div>
        <label>
          <textarea value={this.state.value} onChange={this.handleChange} cols="20" rows="10" />
        </label>
        <div>{this.state.value}</div>
      </div>
    );
  }
}


/***
* 包含关系 (类似vue 的slot)
{props.children} 则渲染所有props Dom
*/
function Contacts() {
  return (
    <div>Contacts Component</div>
  )
}
function Chat() {
  return (
    <div>Chat Component</div>
  )
}
function Wrapper(props) {
  return (
    <i>{props.children}</i>
  )
}
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        <Wrapper>{props.left}</Wrapper>
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function IncludeApp() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}



/**
 * findDOMNode: 提取真正的DOM
 */
class DomNode extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.refs.myTextInput.focus();
  }
  render() {
    return (
      <div>
        <input type="text" ref="myTextInput" />
        <input type="button" value="Focus the text input" onClick={this.handleClick} />
      </div>
    );
  }
}


ReactDOM.render(
  <div>
    <h5>input-model 双向绑定</h5>
    <NameForm />
    <hr/>
    <h5>组件之间的包含关系</h5>
    <IncludeApp />
    <hr/>
    <DomNode />
  </div>,
  document.getElementById('root')
);

export default () => {
  return (
    <section>
    <h3>Base Test</h3>
    <h5>input-model 双向绑定</h5>
    <NameForm />
    <hr/>
    <h5>组件之间的包含关系</h5>
    <IncludeApp />
    <hr/>
    <DomNode />
  </section>
  )
}