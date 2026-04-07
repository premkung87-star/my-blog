import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        pubDate: fields.date({ label: 'Publish Date' }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        lang: fields.select({
          label: 'Language',
          options: [
            { label: 'Thai', value: 'th' },
            { label: 'English', value: 'en' },
          ],
          defaultValue: 'th',
        }),
        postType: fields.select({
          label: 'Post Type',
          options: [
            { label: 'None', value: '' },
            { label: 'Essay', value: 'Essay' },
            { label: 'Note', value: 'Note' },
            { label: 'Lesson', value: 'Lesson' },
            { label: 'Story', value: 'Story' },
          ],
          defaultValue: '',
        }),
        series: fields.text({ label: 'Series Name (optional)' }),
        seriesOrder: fields.integer({ label: 'Series Order (optional)' }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
});
