// Decap CMS Preview Templates
// These components render live previews in the CMS editor

const ProjectCardPreview = createClass({
  render() {
    const entry = this.props.entry;
    const pillar = entry.getIn(['data', 'pillar']);
    const titleEn = entry.getIn(['data', 'title_en']);
    const client = entry.getIn(['data', 'client']);
    const year = entry.getIn(['data', 'year']);
    const summaryEn = entry.getIn(['data', 'summary_en']);
    const cover = entry.getIn(['data', 'cover']);
    
    const pillarColors = {
      graphic: '#FFB5DD',
      web: '#7FFFCA',
      '3d': '#A30058'
    };

    return h('div', {
      className: 'case-card',
      style: {
        background: '#141414',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid #232323',
        transition: 'all 260ms cubic-bezier(0.2, 0.8, 0.2, 1)'
      }
    },
      cover && h('div', {
        className: 'case-card__image',
        style: {
          width: '100%',
          height: '280px',
          background: `url(${cover}) center/cover`,
          backgroundColor: '#1E1E1E'
        }
      }),
      h('div', {
        className: 'case-card__content',
        style: {
          padding: '2rem'
        }
      },
        h('div', {
          className: 'case-card__meta',
          style: {
            display: 'flex',
            gap: '0.75rem',
            marginBottom: '1rem',
            fontSize: '0.875rem',
            color: '#D3D3D3'
          }
        },
          h('span', {
            style: {
              padding: '0.25rem 0.75rem',
              borderRadius: '4px',
              background: pillarColors[pillar] || '#7FFFCA',
              color: '#0B0B0B',
              fontWeight: '500',
              textTransform: 'capitalize'
            }
          }, pillar),
          h('span', {}, `${client} • ${year}`)
        ),
        h('h3', {
          style: {
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(22px, 2.2vw, 28px)',
            fontWeight: '700',
            letterSpacing: '-0.01em',
            lineHeight: '1.2',
            marginBottom: '0.75rem',
            color: '#FFFFFF'
          }
        }, titleEn),
        h('p', {
          style: {
            color: '#D3D3D3',
            lineHeight: '1.6',
            marginBottom: '1.5rem'
          }
        }, summaryEn),
        h('button', {
          style: {
            padding: '0.75rem 1.5rem',
            background: 'transparent',
            border: '1px solid #7FFFCA',
            borderRadius: '8px',
            color: '#7FFFCA',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 180ms ease'
          }
        }, 'Read the process')
      )
    );
  }
});

const ProjectPagePreview = createClass({
  render() {
    const entry = this.props.entry;
    const titleEn = entry.getIn(['data', 'title_en']);
    const client = entry.getIn(['data', 'client']);
    const year = entry.getIn(['data', 'year']);
    const pillar = entry.getIn(['data', 'pillar']);
    const role = entry.getIn(['data', 'role']);
    const duration = entry.getIn(['data', 'duration']);
    const tools = entry.getIn(['data', 'tools']);
    const challengeEn = entry.getIn(['data', 'challenge_en']);
    const approachEn = entry.getIn(['data', 'approach_en']);
    const outcomeEn = entry.getIn(['data', 'outcome_en']);
    const bodyEn = entry.getIn(['data', 'body_en']);
    const cover = entry.getIn(['data', 'cover']);
    
    const pillarColors = {
      graphic: '#FFB5DD',
      web: '#7FFFCA',
      '3d': '#A30058'
    };

    return h('div', {
      style: {
        background: '#0B0B0B',
        color: '#FFFFFF',
        fontFamily: "'Poppins', sans-serif",
        padding: '2rem',
        minHeight: '100vh'
      }
    },
      // Hero
      cover && h('div', {
        style: {
          width: '100%',
          height: '60vh',
          background: `url(${cover}) center/cover`,
          backgroundColor: '#1E1E1E',
          borderRadius: '16px',
          marginBottom: '3rem'
        }
      }),
      
      // Title & Meta
      h('div', {
        style: {
          maxWidth: '1320px',
          margin: '0 auto'
        }
      },
        h('h1', {
          style: {
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: '700',
            letterSpacing: '-0.01em',
            lineHeight: '1.1',
            marginBottom: '1.5rem'
          }
        }, titleEn),
        
        h('div', {
          style: {
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
            padding: '1.5rem',
            background: '#141414',
            borderRadius: '12px',
            marginBottom: '3rem',
            border: '1px solid #232323'
          }
        },
          h('div', {},
            h('div', { style: { fontSize: '0.875rem', color: '#606D6A', marginBottom: '0.25rem' } }, 'Client'),
            h('div', { style: { fontWeight: '500' } }, client)
          ),
          h('div', {},
            h('div', { style: { fontSize: '0.875rem', color: '#606D6A', marginBottom: '0.25rem' } }, 'Year'),
            h('div', { style: { fontWeight: '500' } }, year)
          ),
          h('div', {},
            h('div', { style: { fontSize: '0.875rem', color: '#606D6A', marginBottom: '0.25rem' } }, 'Pillar'),
            h('span', {
              style: {
                padding: '0.25rem 0.75rem',
                borderRadius: '4px',
                background: pillarColors[pillar],
                color: '#0B0B0B',
                fontWeight: '500',
                textTransform: 'capitalize'
              }
            }, pillar)
          ),
          h('div', {},
            h('div', { style: { fontSize: '0.875rem', color: '#606D6A', marginBottom: '0.25rem' } }, 'Duration'),
            h('div', { style: { fontWeight: '500' } }, duration)
          )
        ),
        
        // 30s Summary
        h('div', {
          style: {
            background: '#141414',
            padding: '2rem',
            borderRadius: '12px',
            marginBottom: '3rem',
            border: '1px solid #232323'
          }
        },
          h('h2', {
            style: {
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(28px, 3.2vw, 44px)',
              fontWeight: '700',
              marginBottom: '1.5rem'
            }
          }, '30s Summary'),
          challengeEn && h('div', { style: { marginBottom: '1rem' } },
            h('strong', { style: { color: '#7FFFCA' } }, 'Challenge: '),
            h('span', {}, challengeEn)
          ),
          approachEn && h('div', { style: { marginBottom: '1rem' } },
            h('strong', { style: { color: '#7FFFCA' } }, 'Approach: '),
            h('span', {}, approachEn)
          ),
          outcomeEn && h('div', {},
            h('strong', { style: { color: '#7FFFCA' } }, 'Outcome: '),
            h('span', {}, outcomeEn)
          )
        ),
        
        // Body
        bodyEn && h('div', {
          style: {
            lineHeight: '1.8',
            fontSize: '1.125rem',
            color: '#D3D3D3'
          },
          dangerouslySetInnerHTML: {
            __html: this.props.widgetFor('body_en')
          }
        })
      )
    );
  }
});

// Register preview templates
CMS.registerPreviewTemplate('projects', ProjectPagePreview);

// Register preview styles
CMS.registerPreviewStyle('/assets/css/styles.css');
