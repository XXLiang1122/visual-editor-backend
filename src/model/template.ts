import mongoose from 'mongoose'

const Schema = mongoose.Schema
const TemplateModel = mongoose.model('template', new Schema({
  author: String,
  title: {
    type: String,
    default: '新模板'
  },
  desc: {
    type: String,
    default: ''
  },
  coverUrl: {
    type: String,
    default: ''
  },
  template: {
    global: {
      width: {
        type: Number,
        default: 1280
      },
      height: {
        type: Number,
        default: 720
      }
    },
    background: {
      color: {
        type: String,
        default: '#fff'
      }
    },
    layers: {
      type: Array,
      default: []
    }
  }
}, {
  timestamps: true
}))

export default TemplateModel