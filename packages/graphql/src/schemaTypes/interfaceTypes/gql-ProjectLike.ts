import { interfaceType } from 'nexus'

export interface ProjectShape {
  projectId?: string | null
  projectRoot: string
  title: string
}

export const ProjectLike = interfaceType({
  name: 'ProjectLike',
  description: 'Common base fields inherited by GlobalProject / CurrentProject',
  definition (t) {
    t.nonNull.string('projectRoot', {
      description: 'Absolute path to the project on the filesystem',
    })

    t.string('projectId', {
      description: 'Used to associate project with Cypress cloud',
      resolve: (source, args, ctx) => {
        // TODO
        return null
      },
    })

    t.nonNull.string('title', {
      resolve: (source, args, ctx) => ctx.path.basename(source.projectRoot),
    })
  },
  resolveType (root) {
    return 'GlobalProject'
  },
  sourceType: {
    module: __dirname,
    export: 'ProjectShape',
  },
})
