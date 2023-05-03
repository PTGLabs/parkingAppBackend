import { Schema } from 'mongoose';

interface TransformFn {
  (doc: any, ret: any, options: any): any;
}

const toJSON = (schema: Schema) => {
  let transform: TransformFn | undefined;
  const toJSONOpts = schema.get('toJSON');
  if (typeof toJSONOpts === 'object' && typeof toJSONOpts.transform === 'function') {
    transform = toJSONOpts.transform;
  }

  schema.set('toJSON', {
    transform(doc: any, ret: any, options: any) {
      Object.keys(schema.paths).forEach(path => {
        if (schema.paths[path].options && schema.paths[path].options.private) {
          delete ret[path];
        }
      });

      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      if (transform) {
        return transform(doc, ret, options);
      }
    },
  })
};

export default toJSON;
