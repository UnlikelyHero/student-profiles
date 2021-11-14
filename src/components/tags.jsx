import React, { useState, useContext } from 'react';
import TagContext from '../tagContext.jsx';

const Tags = ({ name }) => {
  const { tags, updateTags } = useContext(TagContext);
  const [ tag, setTag ] = useState('');

  const addTag = () => {
    const newTags = Object.assign(tags);
    newTags[name] ? newTags[name].push(tag) : newTags[name] = [tag];
    updateTags(newTags)
  }

  const removeTag = (index) => {
    console.log('poof');
    const newTags = Object.assign(tags);
    newTags[name].splice(index, 1);
    updateTags(newTags)
  }

  const listTags = () => {
    if (tags[name]) {
      return tags[name].map((tag, i) => (
      <div key={i} className="tag">
        {tag}
      </div>))
    }
  }

  return (
    <div className="tagsComponent">
      <div className="tagList">
        {listTags()}
      </div>
      <form autoComplete="off" onSubmit={(e) => {
        e.preventDefault();
        addTag();
        setTag('');
      }}>
        <input
          id="addTag"
          className="addTag"
          type="text"
          placeholder="Add a tag"
          value = {tag}
          onChange={(e) => {
            setTag(e.target.value)
          }}
        />
      </form>
    </div>
  )
}

export default Tags;