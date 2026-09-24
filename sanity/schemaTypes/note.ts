import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'note',
  title: 'Note',
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
      name: 'kind',
      type: 'string',
      options: {
        list: ['Tiedote', 'Julkaisu', 'Päivitys', 'Havainto'],
      },
    }),

    defineField({
      name: 'excerpt',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
  ],

  orderings: [
    {
      title: 'Published, newest',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
