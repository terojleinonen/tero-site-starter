import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'excerpt',
      type: 'text',
    }),

    defineField({
      name: 'mainImage',
      type: 'image',
    }),

    defineField({
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    defineField({
      name: 'summary',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'summarySimple',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
  ],
})