import React from 'react';
import { Box, Typography, Stack } from '@pankod/refine-mui';
import { PCT_COLORS } from '../../theme/pctTheme';

const PROJECTS = [
  { id: 1, name: 'Project Name 12345', color: PCT_COLORS.red, start: 2022, end: 2026 },
  { id: 2, name: 'Project Name 12345', color: PCT_COLORS.red, start: 2023, end: 2027 },
  { id: 3, name: 'Project Name 12345', color: PCT_COLORS.red, start: 2021, end: 2025 },
  { id: 4, name: 'Project Name 12345', color: PCT_COLORS.orange, start: 2024, end: 2028 },
  { id: 5, name: 'Project Name 12345', color: PCT_COLORS.blue, start: 2022, end: 2026 },
  { id: 6, name: 'Project Name 12345', color: PCT_COLORS.blue, start: 2023, end: 2029 },
  { id: 7, name: 'Project Name 12345', color: PCT_COLORS.grey, start: 2021, end: 2024 },
];

const START_YEAR = 2021;
const END_YEAR = 2031;
const CURRENT_YEAR = 2025;

const PCTProjectsTimeline: React.FC = () => {
  const totalYears = END_YEAR - START_YEAR + 1;
  const currentPosition = ((CURRENT_YEAR - START_YEAR) / totalYears) * 100;

  return (
    <Box
      sx={{
        bgcolor: '#fff',
        borderRadius: '8px',
        p: 2,
        border: `1px solid ${PCT_COLORS.border}`,
        mt: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography fontWeight={600} fontSize={16} color="#374151">
          Projects Timeline
        </Typography>
        <Typography variant="body2" color={PCT_COLORS.blue} sx={{ cursor: 'pointer' }}>
          Selected Project Details →
        </Typography>
      </Box>

      {/* Timeline grid */}
      <Box sx={{ position: 'relative', overflowX: 'auto' }}>
        {/* Year labels */}
        <Box
          sx={{
            display: 'flex',
            mb: 1,
            minWidth: 800,
          }}
        >
          {Array.from({ length: totalYears }, (_, i) => START_YEAR + i).map((year) => (
            <Box
              key={year}
              sx={{
                flex: 1,
                textAlign: 'center',
                fontSize: 11,
                color: PCT_COLORS.grey,
              }}
            >
              {year}
            </Box>
          ))}
        </Box>

        {/* Current year marker */}
        <Box
          sx={{
            position: 'absolute',
            left: `${currentPosition}%`,
            top: 0,
            bottom: 0,
            width: 1,
            borderLeft: `2px dashed ${PCT_COLORS.grey}`,
            zIndex: 2,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              top: -18,
              left: -12,
              fontSize: 10,
              color: PCT_COLORS.grey,
            }}
          >
            {CURRENT_YEAR}
          </Typography>
        </Box>

        {/* Project bars */}
        <Stack spacing={1.5}>
          {PROJECTS.map((project) => {
            const startOffset = ((project.start - START_YEAR) / totalYears) * 100;
            const width = ((project.end - project.start) / totalYears) * 100;

            return (
              <Box key={project.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, minHeight: 28 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 140,
                    fontSize: 11,
                    color: PCT_COLORS.grey,
                    flexShrink: 0,
                  }}
                >
                  {project.name}
                </Typography>
                <Box
                  sx={{
                    flex: 1,
                    position: 'relative',
                    height: 20,
                    minWidth: 600,
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      left: `${startOffset}%`,
                      width: `${width}%`,
                      height: 16,
                      bgcolor: project.color,
                      borderRadius: 2,
                    }}
                  />
                  {/* Milestone diamond */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: `${startOffset + width - 2}%`,
                      top: 4,
                      width: 8,
                      height: 8,
                      bgcolor: project.color,
                      transform: 'rotate(45deg)',
                    }}
                  />
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Box>

      {/* Legend */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 3, fontSize: 10 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 8, height: 8, bgcolor: PCT_COLORS.red, borderRadius: 1 }} />
          <span style={{ color: PCT_COLORS.grey }}>Priority</span>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 8, height: 8, bgcolor: PCT_COLORS.orange, borderRadius: 1 }} />
          <span style={{ color: PCT_COLORS.grey }}>Tier</span>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 8, height: 8, bgcolor: PCT_COLORS.blue, borderRadius: 1 }} />
          <span style={{ color: PCT_COLORS.grey }}>Phase 1,2 & 3 Start</span>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 8, height: 8, bgcolor: PCT_COLORS.purple, borderRadius: 1 }} />
          <span style={{ color: PCT_COLORS.grey }}>Regulatory Submission</span>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 8, height: 8, bgcolor: PCT_COLORS.grey, borderRadius: 1 }} />
          <span style={{ color: PCT_COLORS.grey }}>Study</span>
        </Box>
      </Box>
    </Box>
  );
};

export default PCTProjectsTimeline;
