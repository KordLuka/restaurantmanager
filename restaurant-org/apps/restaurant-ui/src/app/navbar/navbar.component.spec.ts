import { NavbarComponent } from './navbar.component';
import { render, screen } from '@testing-library/angular';
import '@testing-library/jest-dom';

describe('NavbarComponent', () => {
  it('should display navigation items', async () => {
    await render(NavbarComponent, {
      componentProperties: {
        routingConfigs: [
          {
            domain: 'test',
            routes: [
              {
                label: 'test1',
              },
            ],
          },
          {
            domain: 'restaurant',
            routes: [
              {
                label: 'test2',
              },
            ],
          },
          {
            domain: 'restaurant',
            routes: [
              {
                label: 'test3',
              },
            ],
          },
        ],
      },
    });

    expect(screen.getByText('test2')).toBeInTheDocument();
  });
});
