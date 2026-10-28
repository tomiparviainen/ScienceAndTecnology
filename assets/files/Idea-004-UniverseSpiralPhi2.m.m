function UniverseSpiralPhi()

close all
clear all
%% ================================================================
% Physical constants
% ================================================================

G = 6.67430e-11;                 % m^3/(kg s^2)
c = 299792458;                   % m/s
parsec    = 3.085677581491367e16;   % m
lightyear = 9.4607304725808e15;     % 
year = 365.25 * 24 * 3600;          % s
T0   = 13.744 * 1e9 * year;              % s

%% ================================================================
% Particle masses
% ================================================================

R0    = 13.787 *1e9 * lightyear;;%13.744 *1e9 * lightyear;
M     = R0 * c^2 / (2 * G);


%% ================================================================
% Numerical parameters
% ================================================================

N = 1e7;

rmin = 379000/15*lightyear;
rmax = R0;

theta0 = pi/2;

%% ================================================================
% Allocate
% ================================================================
% 
% r_all   = zeros(N,1);
% v_all   = zeros(N,1);
% s_all   = zeros(N,1);
% phi_all = zeros(N,1);

%% ================================================================
% Main calculation
% ================================================================

for k = 1:1

    %% ------------------------------------------------------------
    % Schwarzschild-type length scale
    % ------------------------------------------------------------

%     R0 = 2*G*M(k)/c^2;

    %% ------------------------------------------------------------
    % Corresponding phi range
    %
    % phi = (R0/r)^2
    % ------------------------------------------------------------

    phi_min = (R0/(rmax))^2;
    phi_max = (R0/rmin)^2;

    %% ------------------------------------------------------------
    % Logarithmic phi grid
    %
    % This is important because phi may span many orders
    % of magnitude.
    % ------------------------------------------------------------

    phi = logspace( ...
        log10(phi_min), ...
        log10(phi_max), ...
        N)';

    %% ------------------------------------------------------------
    % r(phi)
    % ------------------------------------------------------------

    r = R0 ./ sqrt(phi);

    %% ------------------------------------------------------------
    % dr/dphi
    % ------------------------------------------------------------

    drdphi = -R0 ./ (2*phi.^(3/2));

    %% ------------------------------------------------------------
    % ds/dphi
    %
    % ds^2 = dr^2 + r^2 sin(theta)^2 dphi^2
    % ------------------------------------------------------------

    dsdphi = sqrt( ...
        drdphi.^2 + ...
        r.^2 .* sin(theta0).^2);

    %% ------------------------------------------------------------
    % v(phi)
    %
    % t = r/c
    %
    % v = |ds/dt|
    %   = |ds/dphi| / |dt/dphi|
    % ------------------------------------------------------------

    v = c .* dsdphi ./ abs(drdphi);

    %% ------------------------------------------------------------
    % Integrate s(phi)
    %
    % phi increases from small r-turning angle to large angle,
    % therefore s increases monotonically.
    % ------------------------------------------------------------

    s = cumtrapz((phi),(dsdphi));

%% ------------------------------------------------------------
% % Integrate s(r)
% 
% % ds/dr = ds/dphi / |dr/dphi|
% 
% % r is currently ordered from rmax -> rmin,
% % therefore reverse the arrays before integration.
% % ------------------------------------------------------------
% 
% % dsdr = dsdphi ./ abs(drdphi);
% 
% phi_rev    = flipud(phi);
% dsdphi_rev = flipud(dsdphi);
% 
% % Set s(rmin) = 0
% s_rev = cumtrapz(phi_rev,dsdphi_rev);
% 
% % Return to original phi ordering
% s = -flipud(s_rev);
% s(1:10)
% s(end-9:end)

    %% Store

    phi_all = phi;
    r_all   = r;
    v_all   = v;
    s_all   = s;


    %% Hubble parameters

    H0 = c ./ 1000 ./ (r / (1e6 * parsec));

    %% Redshift model

    z_model = sqrt(1 + s / R0) - 1;

    %% Unique redshift grid
    
    [z, idx] = unique(z_model);
    mu_model = 5 * log10(s / (20 * parsec));
    mu = mu_model(idx);

%% Supernova data
obs = readData();

[obszSN, idxSN] = unique(obs.zSN);

obsmuSN    = obs.muSN(idxSN);
obssigmaSN = obs.sigmaSN(idxSN);

%% GRB data

[obszGRB, idxGRB] = unique(obs.zGRB);

obsmuGRB    = obs.muGRB(idxGRB);
obssigmaGRB = obs.sigmaGRB(idxGRB);

%% Interpolate model to observational redshifts

muSN  = interp1(z, mu, obszSN);
muGRB = interp1(z, mu, obszGRB);

%% Chi-square

chiSN = sum(((muSN - obsmuSN) ./ obssigmaSN).^2);
chiGRB = sum(((muGRB - obsmuGRB) ./ obssigmaGRB).^2);

N1 = numel(obsmuSN);
N2 = numel(obsmuGRB);

chi2_total = chiSN + chiGRB;
dof_total  = N1 + N2;


%% Relative RMS

rmsrel_muSN = sqrt( ...
    mean(((obsmuSN - muSN) ./ obsmuSN).^2));

    %% Print

    fprintf('\n');
    fprintf('====================================================\n');
    fprintf('====================================================\n');

    fprintf('Mass       = %.8e kg\n',M);
    fprintf('R0         = %.8e m\n',R0);
    fprintf('Hubble constant (c)     = %.4f km/s/Mpc\n', H0(1));
    fprintf('Red shift     = %.4f \n', z_model(end));

    fprintf('phi min    = %.8e\n',phi_min);
    fprintf('phi max    = %.8e\n',phi_max);

    fprintf('r(phi_min) = %.8e m\n',r(1));
    fprintf('r(phi_max) = %.8e m\n',r(end));

    fprintf('v(phi_min) = %.8e m/s\n',v(1));
    fprintf('v(phi_max) = %.8e m/s\n',v(end));

    fprintf('s(phi_min) = %.8e m\n',s(1));
    fprintf('s(phi_max) = %.8e m\n',s(end));

    fprintf('\n');
    fprintf('SN chi2                 = %.4f\n', chiSN);
    fprintf('GRB chi2                = %.4f\n', chiGRB);
    fprintf('Total chi2              = %.4f\n', chi2_total);
    
    fprintf('\n');
    fprintf('Reduced SN chi2         = %.4f\n', chiSN / N1);
    fprintf('Reduced GRB chi2        = %.4f\n', chiGRB / N2);
    fprintf('Reduced total chi2      = %.4f\n', chi2_total / dof_total);


end

f = figure,
f.Position = [0 0 1200 800]
%% 1. Distance modulus vs redshift

subplot(2,3,1)


semilogx( ...
    [obs.zGRB obs.zGRB]', ...
    [obs.muGRB - obs.sigmaGRB ...
     obs.muGRB + obs.sigmaGRB]', ...
    'r-','LineWidth', 0.2);

hold on

semilogx( ...
    [obs.zSN obs.zSN]', ...
    [obs.muSN - obs.sigmaSN ...
     obs.muSN + obs.sigmaSN]', ...
    'b-','LineWidth', 0.2);

hold on

semilogx(z, mu, 'k-', 'LineWidth', 1.2);


hold off
axis square
grid on

title('SN Ia and GRB data vs model', 'Interpreter', 'latex');
xlabel('Redshift', 'Interpreter', 'latex');
ylabel('Distance modulus', 'Interpreter', 'latex');

%% 4. SN residuals

subplot(2,3,4)

semilogx( ...
    obszSN, ...
    muSN - obsmuSN, ...
    '.');

    hold on

    semilogx(obszGRB, muGRB - obsmuGRB, '.');

    axis square
    grid on
    axis([1e-3 1e1 -3 3])
    hold off

axis square
grid on
xlabel('$z$', 'Interpreter', 'latex');
ylabel('$\Delta\mu$', 'Interpreter', 'latex');
title('SN Ia residuals', 'Interpreter', 'latex');

%% 3. Look-back time

subplot(2,3,2)

lookback_Gyr = ...
    (r/c ) / (1e9 * year);

semilogx( ...
    z_model, ...
    T0/ (1e9 * year) -lookback_Gyr, ...
    'linewidth',1.2);

axis square
grid on

title('Look-back time by redshift', 'Interpreter', 'latex');
xlabel('Redshift', 'Interpreter', 'latex');
ylabel('Look-back time (Gyr)', 'Interpreter', 'latex');

%axis([1e-3 1e2 -1 15])


%% 6. Hubble parameter

subplot(2,3,5)
semilogy( ...
    r/c  / (1e9 * year), ...
    H0, ...
    'linewidth',1.2)
grid on
 axis([0 15 1e0 1e4])
axis square


xlabel('$t$ (Gyr)', 'Interpreter', 'latex');
ylabel('$H$ (km/s/Mpc)', 'Interpreter', 'latex');
title('Hubble parameter', 'Interpreter', 'latex');


%% 6. Velocity

% % figure,
% subplot(2,3,3)
% 
% 
% semilogy( ...
%     r/c  / (1e9 * year), ...
%     v/c, ...
%     'LineWidth', 0.5);
% 
% axis square
% grid on
% 
% xlabel('$t$ (Gyr)', 'Interpreter', 'latex');
% ylabel('$v$ (light velocity)', 'Interpreter', 'latex');
% title('Hubble parameter', 'Interpreter', 'latex');
% 
% % axis([0 15 1 1e9])



% %% ================================================================
% % FIGURE 1
% % r(phi)
% % ================================================================
% 
% figure('Color','w');
% %hold on
% 
% 
% 
%     loglog( ...
%         phi, ...
%         r, ...
%         'LineWidth',1.2);
% 
% 
% %grid on
% % axis square
% 
% xlabel('$\phi$ (rad)','Interpreter','latex');
% ylabel('$r(\phi)$ (m)','Interpreter','latex');
% 
% title('$r(\phi)$','Interpreter','latex');
% 
% %% ================================================================
% % FIGURE 2
% % v(phi)
% % ================================================================
% 
% figure('Color','w');
% 
% 
%     loglog( ...
%         phi, ...
%         v, ...
%         'LineWidth',1.2);
% 
% 
% 
% yline(c,'k--','c');
% 
% grid on
% % axis square
% 
% xlabel('$\phi$ (rad)','Interpreter','latex');
% ylabel('$v(\phi)$ (m/s)','Interpreter','latex');
% 
% title('$v(\phi)$','Interpreter','latex');
% 
% %% ================================================================
% % FIGURE 3
% % s(phi)
% % ================================================================
% 
% figure('Color','w');
% 
% 
%     loglog( ...
%         phi, ...
%         s, ...
%         'LineWidth',1.2);
% 
% 
% grid on
% % axis square
% 
% xlabel('$\phi$ (rad)','Interpreter','latex');
% ylabel('$s(\phi)$ (m)','Interpreter','latex');
% 
% title('$s(\phi)$','Interpreter','latex');
% 
% %% ================================================================
% % FIGURE 4
% % v(r)
% % ================================================================
% 
% figure('Color','w');
% 
% 
subplot(2,3,3)
    loglog( ...
        r/lightyear, ...
        v/c, ...
        'LineWidth',1.2);



yline(1,'k--','c');

grid on
axis square

xlabel('$r$ (lightyear)','Interpreter','latex');
ylabel('$v(r)$ (light velocity)','Interpreter','latex');

title('Expansion velocity','Interpreter','latex');

% 
% %% ================================================================
% % FIGURE 5
% % s(r)
% % ================================================================
% 
% figure('Color','w');
% 
% 
%     loglog( ...
%         r, ...
%         s, ...
%         'LineWidth',1.2);
% 
% 
% grid on
% % axis square
% 
% xlabel('$r$ (m)','Interpreter','latex');
% ylabel('$s(r)$ (m)','Interpreter','latex');
% 
% title('$s(r)$','Interpreter','latex');



%% ================================================================
% FIGURE 6
% E(phi)
% ================================================================
% J = 6241509343260179456;
% figure('Color','w');
% 
% % for k = 1:3
% %     for  k2 = 1:3
% 
%     loglog( ...
%         r, ...
%         M*v.^2*J, ...
%         'LineWidth',1.2);
% 
% % %     end
% % 
% %     loglog( ...
% %         r_all(:,k), ...
% %         M(2)*v_all(:,k).^2*J, ...
% %         'LineWidth',1.2);
% % 
% %     hold on
% % 
% %     loglog( ...
% %         r_all(:,k), ...
% %         M(3)*v_all(:,k).^2*J, ...
% %         'LineWidth',1.2);
% % 
% % end
% hold off
% ============================================================
subplot(2,3,6)
x = r.*cos(phi);
y = r.*sin(phi);

plot(x/(lightyear),y/(lightyear),'linewidth',1.2)
axis([-1.5e10 1.5e10, -1.5e10 1.5e10]) 
axis square
grid on

xlabel('$x$ (lightyear)','Interpreter','latex');
ylabel('$y$ (lightyear)','Interpreter','latex');
title('Worldline','Interpreter','latex');
% %% ================================================================
% % FIGURE 7
% % dE(r)
% % ================================================================
% J = 6241509343260179456;
% figure('Color','w');
% 
% E = zeros(N,9);
% ii = 1;
% for i = 1:3
%     for j = 1:3
%         E(:,ii) =  M(i)*v_all(:,j).^2*J;
%         ii = ii + 1;
%     end
% end
% 
% for i = 1:9
%     for j = 1:9
%         dE = E(:,i) - E(:,j);
%         if sum(dE(:)) > 0
% 
%         loglog( ...
%          r_all(:,k), ...
%          dE, ...
%         'LineWidth',1.2);
%         hold on
%         end
%     end
% end
% 
% %         E(:,2) =  M(2)*c*v_all(:,2).^1*J;
% %             E(:,k) =  M(3)*c*v_all(:,2).^1*J;
% 
% %end
% % 
% % dE1 = E(:,2)./E(:,1);
% % dE2 = E(:,3)./E(:,2);
% % dE3 = E(:,3)./E(:,1);
% % 
% % dE12 = dE1./dE2;
% % 
% % dE23 = dE3./dE2;
% % 
% % dE13 = dE3./dE1;
% % 
% % [dE1(end)/dE2(end) dE3(end)/dE1(end) dE3(1)/dE2(end)]
% % 
% %     loglog( ...
% %         r_all(:,k), ...
% %         dE1, ...
% %         r_all(:,k), ...
% %         dE2, ...
% %         r_all(:,k), ...
% %         dE3, ...
% %         'LineWidth',1.2);
% % 
% %     legend('dE1','dE2','dE3','Location','best');
% 

exportgraphics(f,'C:\Users\tomia\Documents\MATLAB\UniverseSpiralPhi.png')

end


%% ========================================================================
% DATA READER
% ========================================================================

function obs = readData()

SN  = readtable('Pantheon+SH0ES.dat');
GRB = readtable('GRB.txt');

%% Supernovae

h = 0;
obs.zSN     = SN.zHD;

obs.muSN    = h + SN.MU_SH0ES;
obs.sigmaSN = SN.MU_SH0ES_ERR_DIAG;

%% Gamma-ray bursts

obs.zGRB     = GRB.Var2;
obs.muGRB    = h + GRB.Var3;
obs.sigmaGRB = GRB.Var4;

end
