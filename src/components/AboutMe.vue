<template>
  <div id="about-me">
    <div class="card mb-5 mx-auto">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="../assets/img/aboutme.jpeg" class="card-img" alt="..." />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title display-4">Mandzik, Brandon</h5>
            <h6 class="card-subtitle text-muted mb-4">Software-Developer</h6>
            <p class="card-text">
              Hi, my name is Brandon.
              <br />I'm a 22 y.o student from
              <em>Berlin</em> and I'm enrolled for my 5th semester in the major "international Media & Computing" and employed for
              <em>spot9</em>.
              <br />For the company I design and develope mircro services in
              <em>Golang</em> but also had projects like making an API more secure.
              <br />My goal is to become a
              <em>full-stack developer</em> and develope microservices.
            </p>
            <table class="table table-hover">
              <tbody class>
                <tr>
                  <td class="lead">Hobbies:</td>
                  <td>Electronic Music, BMX, Tech-Devices</td>
                </tr>
                <tr>
                  <td class="lead">Languages:</td>
                  <td>English, German, Polish</td>
                </tr>
              </tbody>
            </table>


            <p class="card-text">
              <small class="text-muted">Last updated on 22th Feb 2020</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "about-me"
};
</script>

<style>
#about-me {
  margin-top: 10%;
}

@media (max-width: 800px){
  #about-me{
    margin-top: 12%;
  }
}

@media (max-width: 426px){
  #about-me{
    margin-top: 20%;
  }
}
</style>